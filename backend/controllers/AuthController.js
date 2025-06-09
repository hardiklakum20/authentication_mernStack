const userModel = require('../modals/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(409)
                .json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Signup Success', success: true });

    } catch (error) {
        res.status(500)
            .json({ message: error.message, success: false })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403)
                .json({ message: "User does not exist" });
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(403)
                .json({ message: "Password is incorrect" });
        }

        const jwtToken = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login Success',
            success: true,
            jwtToken,
            email,
            name: user.name
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


module.exports = { login, signup }