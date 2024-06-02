import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: String,
    para: String,
    price: String,
    img: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
