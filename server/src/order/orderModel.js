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
