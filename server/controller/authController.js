import user from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user.findone({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } 
        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ _id: user._id ,role: user.role}, 
            process.env.JWT_KEY, {
            expiresIn: '10d',
        });
        res
        .status(200)
        .json({
            message: 'Login successful',
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                // email: user.email,
                role: user.role
            }
        });

    }catch (error) {
        console.log( error.message);
    }

}
export {login}