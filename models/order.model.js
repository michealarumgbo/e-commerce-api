import mongoose, { Schema } from "mongoose";
import { required } from "zod/mini";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "cancelled", "delivered", "Refunded"],
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
