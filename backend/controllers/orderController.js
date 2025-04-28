import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
import Stripe from 'stripe'
import razorpay from 'razorpay'
import productDataModel from '../models/productDataModel.js'
// global variables
const currency = 'inr'
const deliveryCharge = 10


// gateway init
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance =  new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
});

// Placing orders using COD Method
const placeOrder = async (req, res)=>{
    try {
        const {userId, items, amount, address} = req.body;
        
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

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res)=>{
    try {

        const {userId, items, amount, address} = req.body;
        const {origin} = req.headers
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment: false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount: item.price * 100
            },
            quantity : item.quantity
        }))

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })

        res.json({success:true, session_url:session.url});

    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

//Verify Stripe
const verifyStripe = async(req,res)=>{
    try {
        const {orderId, success, userId} = req.body

        if (success === "true") {
            await orderModel.findByIdAndDelete(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({success:true});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false});
        }
    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

// Placing orders using Razoepay Method
const placeOrderRazorpay = async (req, res)=>{
    try {
        const {userId, items, amount, address} = req.body;
        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Razorpay",
            payment: false,
            date:Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save();

        const options = {
            amount: amount*100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if (error) {
                console.log(error);
                return res.json({success:false,message:error})                
            }
            res.json({success:true, order})
        })

    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

// Verify Razorpay
const verifyRazorpay = async(req,res)=>{
    try {
        const {userId, razorpay_order_id} = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
            res.json({success:true, message:"Payment Successful"})    
        }else
        {
            res.json({success:false, message: "Payment Failed"});
        }


    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

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

const sendDataToClient = async (req, res)=>{
    try{
        const {orderId} = req.body;
        const order  =await orderModel.findById(orderId);
        const products = order.items;
        var infos = "";
        infos = "Customer Email:"+order.address.email;
        const productData = await productDataModel.find({});
        products.map(async (product)=>
        {
            const info =productData.find((data) => {return data.productId == product._id});
            if (info !=null)
            {
                infos = infos+" Product Id :"+ product._id + " Info Email:"+info.email+ " Info Password:"+info.password;
            }

        })
        console.log(infos);
        if (infos == "")
            res.json({success:true,message:"No data found"})
        else
            res.json({success:true,message:infos})
    }
    catch(error)
    {
        res.json({success:false, message: error.message});
    }
}

export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe,verifyRazorpay,sendDataToClient}
