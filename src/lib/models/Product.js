import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ['beef', 'mutton', 'chicken', 'other'] },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
    stock: { type: Number, default: 0, required: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
