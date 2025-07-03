import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import catergoryRouter from './routes/categoryRoute.js'
import promotionRouter from './routes/promotionRoute.js'
import walletOneRoutes from './routes/walletone.js'


// App Config
const app = express()
const port = process.env.PORT || 4001

// Подключаем БД и Cloudinary
connectDB()
connectCloudinary()

// Middlewares — ДОЛЖНЫ БЫТЬ ДО МАРШРУТОВ
app.use(cors({
  origin: [
    "http://localhost:5173", "http://localhost:5174",
    "https://hurry-scurry.com", "https://admin.hurry-scurry.com",
    "https://www.admin.hurry-scurry.com", "https://www.hurry-scurry.com"
  ],
  credentials: true
}));
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: true }))

// Routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/category', catergoryRouter)
app.use('/api/promotion', promotionRouter)
app.use('/api/walletone', walletOneRoutes)

app.get('/', (req, res) => {
  res.send("API Working")
})

app.listen(port, () => console.log('Server started on Port :' + port))