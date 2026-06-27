import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema(
  {
    cartId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Cart",
    },
    variantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Variant",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
