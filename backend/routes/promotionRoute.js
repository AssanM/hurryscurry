import express from 'express';
import {addPromotion, allPromotions,allActivePromotions,removePromotion} from '../controllers/promotionController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const promotionRouter = express.Router();

promotionRouter.post('/add', adminAuth,upload.fields([{name:'image1', maxCount:1}
]), addPromotion)
promotionRouter.post('/list',adminAuth,allPromotions)
promotionRouter.get('/active',allActivePromotions)
promotionRouter.post('/remove',adminAuth, removePromotion)
export default promotionRouter;