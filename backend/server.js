import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import catergoryRouter from './routes/categoryRoute.js'
import promotionRouter from './routes/promotionRoute.js'


// App Config
const app = express()
const port = process.env.PORT || 4001

connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://hurry-scurry.com", "https://admin.hurry-scurry.com", "https://www.admin.hurry-scurry.com", "https://www.hurry-scurry.com"],
  credentials: true
}));

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/category', catergoryRouter)
app.use('/api/promotion', promotionRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=> console.log('Server started on Port :' + port))
