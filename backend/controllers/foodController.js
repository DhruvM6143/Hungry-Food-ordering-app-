import foodModel from "../models/FoodModel.js";

import fs from 'fs'

export const addFood = async (req, res) => {
    let image_filename = req.file.filename;



    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    });
    try {
        if (food) {

            await food.save();
            res.json({ sucess: true, message: "Food Added successfully" })
        }
        else {
            res.json({ sucess: false, message: "Error adding product" })
        }
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: "Error saving product" })

    }
}


export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({
            sucess: true,
            data: foods
        })
    } catch (error) {
        console.log(error);
        res.json({
            sucess: false,
            message: "Error fetching products"
        })

    }
}


export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ sucess: true, message: "Food removed successfully" })
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, message: "Error removing product" })

    }
}
