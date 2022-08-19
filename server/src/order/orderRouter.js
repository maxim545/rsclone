import express from 'express';
import Order from './orderModel';
import { isAccess, verifyToken } from '../utils';

const orderRouter = express.Router();

orderRouter.get(
    '/',
    async (req, res) => {
        const orders = await Order.find({}).populate('user');
        res.send(orders);
    },
);

orderRouter.get(
    '/purchase',
    verifyToken,
    async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    },
);

orderRouter.get(
    '/:id',
    verifyToken,
    async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    },
);

orderRouter.post(
    '/',
    verifyToken,
    async (req, res) => {
        const order = new Order({
            orderItems: req.body.orderItems,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201).send({ message: 'New Order Created', order: createdOrder });
    },
);

orderRouter.delete(
    '/:id',
    verifyToken,
    isAccess,
    async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.remove();
            res.send({ message: 'Order deleted' });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    },
);

export default orderRouter;
