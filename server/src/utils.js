import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getToken = (user) => {
    const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    return jwt.sign(data, process.env.JWT_SECRET);
};

export const verifyToken = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        res.status(404).send({ message: 'Is not bearer' });
    } else {
        const token = bearerToken.slice(7, bearerToken.length);
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401).send({ message: 'Your token is invalid' });
            } else {
                req.user = data;
                next();
            }
        });
    }
};

export const isAccess = (req, res, next) => {
    const roles = ['admin', 'manager', 'courier'];
    if (roles.includes(req.user) || roles.includes(req.user.role)) {
        next();
    } else {
        res.status(401).send({ message: 'You are not admin' });
    }
};
