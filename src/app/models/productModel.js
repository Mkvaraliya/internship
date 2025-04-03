import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
 
});

// ✅ Prevent model overwrite issue in Next.js
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
