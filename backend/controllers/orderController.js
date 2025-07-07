import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
import CryptoJS from 'crypto-js';
import productDataModel from '../models/productDataModel.js'
// global variables
const currency = 'inr'
const deliveryCharge = 10


// Placing orders using COD Method
const placeOrder = async (req, res)=>{
    try {
        const {items, amount, address} = req.body;
        const userId = req.user._id;
    console.log('2 Новый заказ от пользователя:', userId);
        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment: false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, {cartData:{}})
        res.json({success:true, message:"Order placed"})

    } catch (error) {
        console.log(error);
        
        res.json({success:false, message: error.message});
    }
}

function createW1Signature(params, secretKey) {
  // 1. Сортируем параметры по ключам в алфавитном порядке
  const sortedKeys = Object.keys(params).sort();
  
  // 2. Формируем строку вида: "ключ=значение" без encodeURIComponent
  const signatureBase = sortedKeys.map(key => `${key}=${params[key]}`).join('&');

  // 3. Создаем HMAC MD5 подпись
  const signature = CryptoJS.HmacMD5(signatureBase, secretKey).toString(CryptoJS.enc.Base64);

  return signature;
}
const placeOrderWalletOne = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user?._id || null; // может быть null
    console.log('Новый заказ от пользователя:', userId || 'ГОСТЬ');

    const orderData = {
      userId, // может быть null
      items,
      address,
      amount,
      paymentMethod: "WalletOne",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await new orderModel(orderData).save();

    const redirectUrl = 'https://w1.ru/checkout/checkout/Index';

    const params = {
      WMI_MERCHANT_ID: process.env.W1_MERCHANT_ID,
      WMI_PAYMENT_AMOUNT: amount.toFixed(2),
      WMI_CURRENCY_ID: "643",
      WMI_PAYMENT_NO: newOrder._id.toString(),
      WMI_DESCRIPTION: Buffer.from("Оплата заказа на сайте").toString("base64"),
      WMI_SUCCESS_URL: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
      WMI_FAIL_URL: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
    };

    const signature = createW1Signature(params, process.env.W1_SECRET_KEY);
    params.WMI_SIGNATURE = signature;

    const urlParams = new URLSearchParams(params).toString();
    const finalUrl = `${redirectUrl}?${urlParams}`;

    res.json({ success: true, redirect_url: finalUrl });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const verifyWalletOne = async (req, res) => {
  try {
    const params = req.body;
    const signatureFromW1 = params.WMI_SIGNATURE;
    const { WMI_ORDER_STATE, WMI_PAYMENT_NO, ...filteredParams } = params;

    delete filteredParams.WMI_SIGNATURE;

    const sortedKeys = Object.keys(filteredParams).sort();
    const signatureBase = sortedKeys
      .map(key => `${key}=${filteredParams[key]}`)
      .join('&');
    const expectedSignature = CryptoJS.HmacMD5(signatureBase, process.env.W1_SECRET_KEY).toString(CryptoJS.enc.Base64);

    if (expectedSignature !== signatureFromW1) {
      console.warn("Подпись не совпадает");
      return res.send("WMI_RESULT=RETRY&WMI_DESCRIPTION=Invalid signature");
    }

    const order = await orderModel.findById(WMI_PAYMENT_NO);
    if (!order) {
      return res.send("WMI_RESULT=RETRY&WMI_DESCRIPTION=Order not found");
    }

    if (WMI_ORDER_STATE === 'Accepted') {
  await orderModel.findByIdAndUpdate(WMI_PAYMENT_NO, { payment: true });

  if (order.userId) {
    await userModel.findByIdAndUpdate(order.userId, { cartData: {} });
  }

  console.log('WalletOne verify received:', req.body);
  return res.send("WMI_RESULT=OK");
} else {
  return res.send(`WMI_RESULT=RETRY&WMI_DESCRIPTION=Order state: ${WMI_ORDER_STATE}`);
}

  } catch (error) {
    console.error(error);
    return res.send("WMI_RESULT=RETRY&WMI_DESCRIPTION=Server error");
  }
};

// All Orders data from Admin Panel
const allOrders = async (req, res)=>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})        
    } catch (error) {
        console.log(error);
        
        res.json({success:false, message: error.message});
    }
}

// User Order Data For Frontend
const userOrders = async (req, res)=>{
    try {
        
        const {userId} = req.body;

        const orders = await orderModel.find({userId})
        res.json({success:true, orders})

    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

// update order status
const updateStatus = async (req, res)=>{
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

const sendDataToClient = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await orderModel.findById(orderId);
    const products = order.items;
    let infos = `Customer Email: ${order.address.email}\n`;

    const productData = await productDataModel.find({});

    for (const product of products) {
      const info = productData.find(data => data.productId == product._id);
      if (info) {
        infos += `\nProduct Id: ${product._id}\nAccount Data:\n${info.accountData}\n`;
      }
    }

    console.log(infos);

    if (infos.trim() === "")
      res.json({ success: true, message: "No data found" });
    else
      res.json({ success: true, message: infos });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export {
  placeOrder,
  placeOrderWalletOne,
  allOrders,
  userOrders,
  updateStatus,
  verifyWalletOne,
  sendDataToClient,
};