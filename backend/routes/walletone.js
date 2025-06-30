import express from 'express';

const router = express.Router();

router.post('/create-payment', async (req, res) => {
  const { amount, email } = req.body;
  const paymentUrl = `https://www.walletone.com/checkout?amount=${amount}&email=${email}`;
  res.json({ success: true, url: paymentUrl });
});

export default router;