import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Order",
    unique: true,
  },
  provider: {
    type: String,
    enum: ["Flutterwave", "Paystack", "Stripe"],
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "successful", "failed", "refunded"],
    default: "pending",
  },

  transactionReference: {
    type: String,
    unique: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
