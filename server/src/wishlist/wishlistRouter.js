import express from 'express';
import Wishlist from './wishlistModel';
import { isAccess, verifyToken } from '../utils';

const wishlistRouter = express.Router();

wishlistRouter.get(
    '/items',
    verifyToken,
    async (req, res) => {
        const wishlist = await Wishlist.find({ user: req.user._id });
        res.send(wishlist);
    },
);

wishlistRouter.post(
    '/',
    verifyToken,
    async (req, res) => {
        const isExist = await Wishlist.findOne({
            user: req.user._id,
            productId: req.body.productId,
        });
        if (isExist) {
            res.status(409).send({
                message: 'This is item already exists in your wishlist',
            });
        } else {
            const wishItem = new Wishlist({
                productId: req.body.productId,
                isExist: req.body.isExist,
                user: req.user._id,
            });
            await wishItem.save();
            res.status(201).send(wishItem);
        }
    },
);

wishlistRouter.delete(
    '/:id',
    verifyToken,
    isAccess,
    async (req, res) => {
        const wishItem = await Wishlist.findById(req.params.id);
        if (wishItem) {
            await wishItem.remove();
            res.send({ message: 'WishItem deleted' });
        } else {
            res.status(404).send({ message: 'WishItem not found' });
        }
    },
);

export default wishlistRouter;
