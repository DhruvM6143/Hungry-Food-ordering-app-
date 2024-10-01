import express from 'express'
import authMiddleware from '../middleware/Auth.js'
import { AllOrders, placeOrder, updateStatus, usersOrder, verifyOrder } from '../controllers/OrderController.js';


const orderRoute = express.Router();
orderRoute.post('/place', authMiddleware, placeOrder);
orderRoute.post('/verify', verifyOrder)
orderRoute.post('/userorders', authMiddleware, usersOrder)
orderRoute.get('/list', AllOrders)
orderRoute.post('/status', updateStatus)

export default orderRoute;