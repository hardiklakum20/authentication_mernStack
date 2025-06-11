const userModel = require('../modals/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(409)
                .send("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(200).send('Signup Success');

    } catch (error) {
        console.log(error);
        res.status(500)
            .send(error)
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403)
                .send("User does not exist");
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(403)
                .send("Password is incorrect");
        }

        const jwtToken = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).send({
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

const forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
    
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
    
        const hashPassword = await bcrypt.hash(newPassword, 10);
        await userModel.findByIdAndUpdate(user._id, { password: hashPassword });
    
        res.status(200).send('Password update successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message || 'Something went wrong');
    }
}

const changePassword = async (req, res) => {
    const userId = req.user.id

    const user = await userModel.findById(userId);
    if (!user) {
        return res.status(404).send("User not found");
    }

    try {
        const { oldPassword, newPassword } = req.body

        const isPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isPassword) {
            return res.status(403)
                .send("Old Password is incorrect");
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        await userModel.findByIdAndUpdate(user._id, { password: hashPassword });

        res.status(200).send('Password changed successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);

    }
}


module.exports = { login, signup, forgotPassword, changePassword }