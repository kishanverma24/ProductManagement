import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productid: {
      type: String,
      required: true,
      unique: true,
    },
    productnumber: {
      type: String,
    },
    productname: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
