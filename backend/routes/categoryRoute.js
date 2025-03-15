import express from 'express';
import { addCategory ,allCategory,removeCategory} from '../controllers/categoryController.js';
import adminAuth from '../middleware/adminAuth.js';

const catergoryRouter = express.Router();

catergoryRouter.post('/add', adminAuth, addCategory)
catergoryRouter.post('/list',allCategory)
catergoryRouter.post('/remove',adminAuth, removeCategory)
export default catergoryRouter;