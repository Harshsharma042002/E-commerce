const User = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ // Changed to 400
                message: "Something is missing",
                success: false,
            });
        }
        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ // Changed to 400
                message: "User with the same email already exists",
                success: false,
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, email, password: hashedPassword });
        
        return res.status(201).json({
            message: "Account has been created, now you can login",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};


const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).json({ // Changed to 400
                message: "Something is missing",
                success: false,
            });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "There is no account to login with this email",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Password is incorrect",
                success: false,
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            cartData: cart,
        };

        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome back ${user.username}`,
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

const LogOut = (req, res) => {
    try {
        res.cookie('token', '', { maxAge: 0, httpOnly: true, sameSite: 'strict' }).json({
            message: "User has been logged out successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = { Register, Login, LogOut };
