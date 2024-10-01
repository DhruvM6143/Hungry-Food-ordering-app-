import userModel from "../models/UserModel.js";

import jwt from 'jsonwebtoken'

import bcrypt from 'bcrypt'

import validator from 'validator'

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            return res.json({
                message: "User already exists",
                success: false
            })
        }
        if (!validator.isEmail(email)) {
            res.json({
                message: "Invalid email",
                success: false
            })
        }
        if (password.length < 4) {
            return res.json({
                success: false,
                message: "Please enter strong password"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const userr = await newUser.save();
        const token = createToken(userr._id)
        res.json({
            success: true,
            message: "User registered successfully",
            token
        })

    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error registering user"
        })

    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password"
            })
        }
        const token = createToken(user._id)
        res.json({
            success: true,
            message: "User logged in successfully",
            token
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error logging in user"
        })

    }
}