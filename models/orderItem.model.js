import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    variantId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Variant",
    },
    priceAtPurchase: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true },
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default OrderItem;
