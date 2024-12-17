import OrderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from 'stripe'



const stripe = new Stripe("sk_test_51Q4d3LCflAMYa6y9dzGPtgpGkBDwExo8dTFHIPdHFHtOveWB4bpS1lO38SOcys537UpSOI1dJajuSsuAKZj3eRYb00uwUaRpMU");




export const placeOrder = async (req, res) => {

    const frontend_url = "https://hungry-food-frontend.onrender.com"
    try {
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,

        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((items) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: items.name,

                },
                unit_amount: items.price * 100

            },
            quantity: items.quantity
        }))

        line_items.push({
            price_data: {
                currency: "USD",
                product_data: {
                    name: "Delivery Charges",

                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

        })


        res.json({
            success: true,
            session_url: session.url
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "error"
        })

    }
}

export const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == 'true') {
            await OrderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({
                success: true,
                message: "Payment successful"
            })
        }
        else {
            await OrderModel.findByIdAndDelete(orderId)
            res.json({
                success: false,
                message: "Payment failed"
            })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

export const usersOrder = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.body.userId })
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "error"
        })

    }
}


//for admin pannel

export const AllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({})
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "error"
        })


    }
}


//api for updating order status

export const updateStatus = async (req, res) => {
    try {
        const order = await OrderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
        res.json({ success: true, message: "Status updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating status" })

    }
}
