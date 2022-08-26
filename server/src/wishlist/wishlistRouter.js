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
            res.status(201).send({ message: 'New item added to wishlist' });
        }

    },
);






export default wishlistRouter;
