import express from 'express'
import {placeOrder, userOrders, updateStatus,  updatePaymentStatus} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
import { listOrders } from '../controllers/orderController.js'

orderRouter.post('/list',adminAuth, listOrders)
orderRouter.post('/status',adminAuth,updateStatus)
orderRouter.post('/payment-status',adminAuth, updatePaymentStatus)
// Payment Features
orderRouter.post('/place',authUser,placeOrder)


// User Feature 
orderRouter.post('/userorders',authUser,userOrders)


export default orderRouter
