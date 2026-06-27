import mongoose, { Schema } from "mongoose";

const inventorySchema = new Schema(
  {
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      unique: true,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    reservedQuantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
