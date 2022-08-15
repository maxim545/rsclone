const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        year: { type: Number, required: true },
        color: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, default: 0.0, required: true },
        brand: { type: String, required: true },
        type: { type: String, required: true },
        variant: [
            {
                size: { type: String, required: true },
                stock: { type: Number, required: true },
            },
        ]
    },
    { timestamps: true }
);


const Product = mongoose.model('Product', productSchema);
export default Order;