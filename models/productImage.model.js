import mongoose, { Schema } from "mongoose";

const productImageSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const ProductImage = mongoose.model("ProductImage", productImageSchema);
export default ProductImage;
