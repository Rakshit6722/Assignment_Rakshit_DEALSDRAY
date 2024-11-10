const Login = require("../models/Login")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are necessary"
            })
        }

        const user = await Login.findOne({ userName })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials, user not found"
            })
        }

        if (await bcrypt.compare(password, user.password)) {

            const payload = {
                id: user._id,
                userName: user.userName,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d"
            })

            return res.cookie("token", token, {
                httpOnly: true
            }).status(200).json({
                success: true,
                data: user,
                token: token,
                message: "Login successful"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials, wrong password"
            })

        }
    } catch (err) {
        console.log("Login error", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
