import express from 'express';
// import verifyToken from '../middleware/verifyToken.js'; ❌ больше не нужен
import placeOrder from '../controllers/placeOrderController.js';

const router = express.Router();

// Открытый маршрут без авторизации
router.post('/place-order', placeOrder); // ✅

/*
// Если оставишь их закомментированными:
router.post('/place-order-walletone', verifyToken, placeOrderWalletOne);
router.post('/user-orders', verifyToken, userOrders);
router.post('/send-data', verifyToken, sendDataToClient);
router.post('/verify-walletone', verifyWalletOne);
router.get('/all-orders', allOrders);
*/

export default router;