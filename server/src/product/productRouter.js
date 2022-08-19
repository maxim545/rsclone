import express from 'express';
import Product from './productModel';
import { verifyToken, isAccess } from '../utils';

const productRouter = express.Router();

productRouter.get(
    '/',
    async (req, res) => {
        const product = await Product.find({});
        res.send(product);
    },
);

productRouter.get(
    '/:id',
    async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    },
);

productRouter.put(
    '/:id',
    verifyToken,
    isAccess,
    async (req, res) => {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (product) {
            product.name = req.body.name;
            product.year = req.body.year;
            product.color = req.body.color;
            product.category = req.body.category;
            product.image = req.body.image;
            product.brand = req.body.brand;
            product.variant = req.body.variant;
            const newProduct = await product.save();
            if (newProduct) {
                res.send({ message: 'Product is updated' });
            } else {
                res.status(500).send({ message: 'Product can not be updated' });
            }
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    },
);

productRouter.post(
    '/',
    verifyToken,
    isAccess,
    async (req, res) => {
        const product = new Product({
            name: req.body.name,
            year: req.body.year,
            color: req.body.color,
            category: req.body.category,
            price: req.body.price,
            brand: req.body.brand,
            image: req.body.image,
            variant: req.body.variant,
        });
        const newProduct = await product.save();
        if (newProduct) {
            res.send({
                name: req.body.name,
                year: req.body.year,
                color: req.body.color,
                category: req.body.category,
                price: req.body.price,
                brand: req.body.brand,
                image: req.body.image,
                variant: req.body.variant,
            });
        } else {
            res.status(500).send({ message: 'Can not create the product' });
        }
    },
);

productRouter.delete(
    '/:id',
    verifyToken,
    isAccess,
    async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove();
            res.send({ message: 'Product deleted' });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    },
);

export default productRouter;
