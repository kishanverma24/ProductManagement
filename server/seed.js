import bcrypt from "bcrypt";
import { User } from "./models/User.js";
import { Product } from "./models/Product.js";
import "./db.js"; // Assuming this file contains your MongoDB connection setup

async function createAdminIfNotExists() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const hashPassword = await bcrypt.hash("adminpassword", 10);
      const newUser = new User({
        username: "admin",
        password: hashPassword,
        userid: "1234",
        useremail: "kishan123@gmail.com",
        isAdmin: true,
        isMainAdmin:true
      });
      await newUser.save();
      console.log("Admin account created");
    } else {
      console.log("Admin account already exists");
    }
  } catch (error) {
    console.error("Error while creating the admin:", error);
  }
}

async function createProductIfNotExists() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const newProduct = new Product({
        productid: "1234abc",
        productnumber: "4578",
        productname: "Bike",
        userid: "1234",
      });
      await newProduct.save();
      console.log("Product created");
    } else {
      console.log("Product already exists");
    }
  } catch (error) {
    console.error("Error while creating the product:", error);
  }
}

async function initializeDatabase() {
  await createAdminIfNotExists();
  await createProductIfNotExists();
}

initializeDatabase();
