import express from 'express';
import User from './userModel';
import { getToken, verifyToken } from './utils';

const userRouter = express.Router();

userRouter.get(
    '/createadmin',
    async (req, res) => {
        try {
            const user = new User({
                name: 'admin',
                email: 'admin@admin.com',
                password: '123',
            });
            const admin = await user.save();
            res.send(admin);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
);

userRouter.post(
    '/login',
    async (req, res) => {
        const loginUser = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        });
        if (!loginUser) {
            res.status(401).send({
                message: 'Invalid data login',
            });
        } else {
            res.send({
                _id: loginUser._id,
                name: loginUser.name,
                email: loginUser.email,
                token: getToken(loginUser),
            });
        }
    }
);


userRouter.post(
    '/register',
    async (req, res) => {
        const nameIsRegister = await User.findOne({
            name: req.body.name,
        });
        const emailIsRegister = await User.findOne({
            email: req.body.email,
        });
        if (nameIsRegister) {
            res.status(409).send({
                message: 'This NAME is already registered',
            });
        } else if (emailIsRegister) {
            res.status(409).send({
                message: 'This EMAIL is already registered',
            });
        } else {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            const newUser = await user.save();
            if (!newUser) {
                res.status(401).send({
                    message: 'Invalid data register',
                });
            } else {
                res.send({
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    token: getToken(newUser),
                });
            }
        }
    }
);

userRouter.put(
    '/:id',
    verifyToken,
    async (req, res) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send({
                message: 'User Not Found',
            });
        } else {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                token: getToken(updatedUser),
            });
        }
    }
);



export default userRouter;