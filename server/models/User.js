import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
      unique: true,
    },
    useremail: {
      type: String,
      required: true,
      unique: true,
    },
    userphonenumber: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isMainAdmin: {
      type: Boolean,
      default: false,
    },

    productcreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Correctly reference the Product model
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
