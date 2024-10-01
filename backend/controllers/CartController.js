
import useModel from '../models/UserModel.js';

export const addToCart = async (req, res) => {
    try {
        let userData = await useModel.findOne({ _id: req.body.userId })
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await useModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ message: 'Item added to cart successfully', success: true })
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error adding item to cart', success: false })

    }
}
export const removeFromCart = async (req, res) => {
    try {
        let userData = await useModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await useModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ message: 'Item removed from cart successfully', success: true })
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error removing item from cart', success: false })
    }
}
export const getCart = async (req, res) => {
    try {
        let userData = await useModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({ cartData, success: true })
    } catch (error) {
        console.log(error);
        res.json({ message: 'Error getting cart data', success: false })

    }
}