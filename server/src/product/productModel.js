import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        year: { type: String, required: true },
        color: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: String, default: 0.0, required: true },
        brand: { type: String, required: true },
        discount: { type: String, required: true },
        image: { type: String, required: true },
        variant: { type: String, required: true },
    },
    { timestamps: true },
);

const Product = mongoose.model('Product', productSchema);
export default Product;
