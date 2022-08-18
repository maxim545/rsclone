import express from 'express';
import User from './userModel';
import { getToken, verifyToken } from '../utils';

const userRouter = express.Router();

userRouter.get(
    '/admin',
    async (req, res) => {
        try {
            const user = new User({
                name: 'admin',
                surname: 'admin',
                phone: '+3',
                adress: 'str',
                thirdname: 'admin',
                email: 'admin@admin.com',
                password: '123',
                role: 'admin'
            });
            const admin = await user.save();
            res.send(admin);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
);


/* userRouter.get(
    '/manager',
    async (req, res) => {
        try {
            const user = new User({
                name: 'manager-1',
                surname: 'manager-1',
                email: 'manager@manager.com',
                password: '123',
                role: 'manager',
            });
            const admin = await user.save();
            res.send(admin);
        } catch (err) {
            res.status(500).send({ message: err.message });
        }
    }
); */


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
                surname: loginUser.surname,
                email: loginUser.email,
                phone: loginUser.phone,
                adress: loginUser.adress,
                thirdname: loginUser.thirdname,
                role: loginUser.role,
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
                    surname: newUser.surname,
                    email: newUser.email,
                    phone: newUser.phone,
                    adress: newUser.adress,
                    thirdname: newUser.thirdname,
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
        const emailIsRegister = await User.findOne({
            email: req.body.email,
        });
        if (!user) {
            res.status(404).send({
                message: 'User Not Found',
            });
        } else if (emailIsRegister && user && emailIsRegister.email !== user.email) {
            res.status(409).send({
                message: 'This is Email already registered another user',
            });
        } else {
            user.name = req.body.name || user.name;
            user.surname = req.body.surname || user.surname;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            user.phone = req.body.phone || user.phone;
            user.adress = req.body.adress || user.adress;
            user.thirdname = req.body.thirdname || user.thirdname;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                surname: updatedUser.surname,
                email: updatedUser.email,
                phone: updatedUser.phone,
                adress: updatedUser.adress,
                thirdname: updatedUser.thirdname,
                role: user.role,
                token: getToken(updatedUser),
            });
        }
    }
);



export default userRouter;