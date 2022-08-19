import express from 'express';
import Order from './orderModel';
import { verifyToken } from '../utils';

const orderRouter = express.Router();

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

export default orderRouter;
