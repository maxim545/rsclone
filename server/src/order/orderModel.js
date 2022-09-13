import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        orderStatus: {
            type: String,
            required: true,
            default: 'processing',
        },
        price: {
            type: Number,
            required: true,
        },
        /* amount: {
            type: Number,
            required: true,
        }, */
        orderItems: [
            {
                name: { type: String, required: true },
                year: { type: String, required: true },
                category: { type: String, required: true },
                price: { type: String, default: 0.0, required: true },
                brand: { type: String, required: true },
                discount: { type: String, required: true },
                image: { type: String, required: true },
                variant: { type: String, required: true },
                color: { type: String, required: true },
                size: { type: String, required: true },
                stock: { type: String, required: true },
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);
const Order = mongoose.model('Order', orderSchema);
export default Order;
