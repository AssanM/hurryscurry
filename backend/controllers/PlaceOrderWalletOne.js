// Placing orders using WalletOne Method
const placeOrderWalletOne = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "WalletOne",
      payment: false,
      date: Date.now(),
    };
    const newOrder = await new orderModel(orderData).save();

    const redirectUrl = 'https://w1.ru/checkout/checkout/Index'; // или тестовый URL

    // Пример параметров (WalletOne docs)
    const params = {
      WMI_MERCHANT_ID: process.env.W1_MERCHANT_ID,
      WMI_PAYMENT_AMOUNT: amount.toFixed(2),
      WMI_CURRENCY_ID: "643", // рубли
      WMI_PAYMENT_NO: newOrder._id.toString(),
      WMI_DESCRIPTION: Buffer.from("Оплата заказа на сайте").toString("base64"),
      WMI_SUCCESS_URL: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
      WMI_FAIL_URL: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
    };

    // Если нужен HMAC-подпись
    // const signature = createW1Signature(params, process.env.W1_SECRET_KEY);
    // params.WMI_SIGNATURE = signature;

    // Собираем ссылку
    const urlParams = new URLSearchParams(params).toString();
    const finalUrl = `${redirectUrl}?${urlParams}`;

    res.json({ success: true, redirect_url: finalUrl });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  placeOrderWalletOne, // ✅ сюда
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
  sendDataToClient,
  // verifyWalletOne (если используешь)
}