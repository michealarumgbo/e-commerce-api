import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true },
);
categorySchema.index(
  {
    name: 1,
    parentCategoryId: 1,
  },
  {
    unique: true,
  },
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
