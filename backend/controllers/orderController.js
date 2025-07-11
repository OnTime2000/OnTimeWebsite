import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// global variables
const currency = 'inr'
const deliveryCharge = 100

// Placing orders using COD Method
const placeOrder = async (req,res) => {
    try {
        const { items, amount, address, customization } = req.body;
        const userId = req.userId;

        const orderData = {
            userId,
            items,
            address,
            amount,
            customization, // add customization data here
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// User Order Data For Frontend
const userOrders = async (req,res) => {
    try {
        const userId = req.userId;
        const orders = await orderModel.find({ userId })
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const updatePaymentStatus = async (req, res) => {
    try {
        const { orderId, payment } = req.body;

        if (typeof payment !== 'boolean') {
            return res.status(400).json({ success: false, message: 'Invalid payment status value' });
        }

        await orderModel.findByIdAndUpdate(orderId, { payment });
        res.json({ success: true, message: 'Payment status updated' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// update order status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { placeOrder, updatePaymentStatus, userOrders, updateStatus, listOrders }
