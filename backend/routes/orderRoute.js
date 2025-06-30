import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  placeOrderWalletOne,
  verifyStripe,
  verifyRazorpay,
  verifyWalletOne,
  userOrders,
  allOrders,
  updateStatus,
  sendDataToClient
} from '../controllers/orderController.js';

const router = express.Router();

// Защищённые маршруты
router.post('/place-order', verifyToken, placeOrder);
router.post('/place-order-stripe', verifyToken, placeOrderStripe);
router.post('/place-order-razorpay', verifyToken, placeOrderRazorpay);
router.post('/place-order-walletone', verifyToken, placeOrderWalletOne);
router.post('/user-orders', verifyToken, userOrders);
router.post('/verify-stripe', verifyToken, verifyStripe);
router.post('/verify-razorpay', verifyToken, verifyRazorpay);
router.post('/send-data', verifyToken, sendDataToClient);

// Необязательные:
router.post('/verify-walletone', verifyWalletOne); // внешняя система, не из клиента
router.get('/all-orders', allOrders); // или тоже можешь защитить

export default router;