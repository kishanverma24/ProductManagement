import express from "express";
import { Product } from "../models/Product.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify user token
const verifyUser = (req, res, next) => {
  const token = req.headers.token;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Invalid User" });
  } else {
    jwt.verify(token, process.env.User_Key, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        req.userid = decoded.userid;
        // console.log(req.userid);
        next();
      }
    });
  }
};

// Adding Product
router.post("/add", verifyUser, async (req, res) => {
  try {
    const { productid, productnumber, productname } = req.body;
    const existingProduct = await Product.findOne({ productid });
    const requesteduser = req.userid;
    const existingUser = await User.findOne({ userid: requesteduser });
    const userid = existingUser.userid;
    if (existingProduct) {
      return res.status(400).json({ message: "Product is already registered" });
    }
    if (!existingUser) {
      return res.status(400).json({ message: "User not Found" });
    }

    const newProduct = new Product({
      productid,
      productnumber,
      productname,
      userid: userid,
    });
    await newProduct.save();
    return res.status(201).json({ product: newProduct });
  } catch (error) {
    return res.status(500).json({ error: "Unable to register a new product" });
  }
});

// Getting all products
router.get("/allproduct", verifyUser, async (req, res) => {
  try {
    // console.log(req.userid);
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }
    return res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Getting single product
router.get("/product/:id", verifyUser, async (req, res) => {
  try {
    const url = req.url;
    const parts = url.split("/");
    const productid = parts[parts.length - 1];
    // console.log(url);
    // const { productid } = req.params.id;
    // console.log(productid);
    const searchedProduct = await Product.findOne({ productid: productid });
    if (!searchedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ product: searchedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deleting Product
router.delete("/delete/:id", verifyUser, async (req, res) => {
  try {
    const url = req.url;
    const parts = url.split("/");
    const productid = parts[parts.length - 1];
    const userid = req.userid;
    const product = await Product.findOne({ productid: productid });
    const requestedUser = await User.findOne({ userid: userid });

    if (requestedUser.isAdmin !== true) {
      return res.status(403).json({
        message: "You are not allowed to delete other user's product",
      });
    }

    const deletedProduct = await Product.findOneAndDelete({
      productid: productid,
    });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product has been deleted", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Updating product
router.put("/update/:id", verifyUser, async (req, res) => {
  try {
    const { productname, productnumber } = req.body;
    const requestedUserId = req.userid;
    const productId = req.params.id;
    const requestedUser = await User.findOne({ userid: requestedUserId });
    const requestedProduct = await Product.findOne({ productid: productId });
    
    if (
      requestedProduct.userid == requestedUser.userid ||
      requestedUser.isAdmin == true
    ) {
      const updatedProduct = await Product.findOneAndUpdate(
        { productid: productId },
        { $set: { productname, productnumber } }
      );
      return res.json({ updatedProduct });
    } else {
      return res.status(403).json({
        message: "You are not authorized to make changes in this Product",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Unable to update a product" });
  }
});

export { router as ProductRouter, verifyUser };
