import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true,
        },
        isExist: {
            type: Boolean,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
);
const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;
