import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
const app = express();
const PORT = process.env.PORT || 4000;

dotenv.config();
//Middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())

connectDB()

//api endpoints

import foodRouter from './routes/FoodRoute.js';
app.use('/api/food', foodRouter)
app.use('/images', express.static('uploads'))

import userRouter from './routes/UserRoute.js';
app.use('/api/user', userRouter)
app.get('/', (req, res) => {
    res.send('API is running')
})

import cartRouter from './routes/CartRoute.js';
import cookieParser from 'cookie-parser';
app.use('/api/cart', cartRouter)

import orderRoute from './routes/OrderRoute.js';
app.use('/api/order', orderRoute);

app.listen(PORT, () => {
    console.log("server is running on port No. " + PORT);

})