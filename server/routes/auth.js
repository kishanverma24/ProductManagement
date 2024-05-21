import express from "express";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

// Middleware to verify user token
const verifyUser = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Invalid Admin" });
  }
  jwt.verify(token, process.env.User_Key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userid = decoded.userid;
    next();
  });
};

// Registering User
router.post("/register", async (req, res) => {
  try {
    const { userid, useremail, userphonenumber, username, password } = req.body;
    const existingUser = await User.findOne({ userid });

    if (existingUser) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userid,
      useremail,
      userphonenumber,
      username,
      password: hashPassword,
    });

    const createdUser = await newUser.save();
    return res.status(201).json({ user: createdUser });
  } catch (error) {
    return res.status(500).json({ error: "Unable to register a new user" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { userid, password } = req.body;
    if (!userid || !password) {
      return res.status(400).json({
        message: "Please provide userid and password",
        success: false,
      });
    }
    const user = await User.findOne({ userid });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Wrong password", success: false });
    }
    const tokenData = { userid: user.userid };

    const token = jwt.sign(tokenData, process.env.User_Key, {
      expiresIn: "1h",
    });
    return res
      .cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .status(200)
      .json({ user, success: true, token });
  } catch (error) {
    return res.status(500).json({ error: "Error during login" });
  }
});

// Getting all users
router.get("/allusers", verifyUser, async (req, res) => {
  try {
    const admin = await User.findOne({ userid: req.userid });
    if (!admin.isAdmin) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const users = await User.find();
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Getting single user
router.get("/users/:id", verifyUser, async (req, res) => {
  try {
    const admin = await User.findOne({ userid: req.userid });
    if (!admin.isAdmin) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const searchedUser = await User.findOne({ userid: req.params.id });
    if (!searchedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user: searchedUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Deleting user
router.delete("/users/:id", verifyUser, async (req, res) => {
  try {
    const admin = await User.findOne({ userid: req.userid });
    if (!admin.isAdmin) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const deletedUser = await User.findOneAndDelete({ userid: req.params.id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ user: deletedUser, success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Updating user
router.put("/users/:id", verifyUser, async (req, res) => {
  try {
    const { useremail, userphonenumber, username, password } = req.body;
    const admin = await User.findOne({ userid: req.userid });
    if (!admin.isAdmin) {
      return res.status(403).json({
        message: "You are not authorized to make changes to this user",
      });
    }

    const user = await User.findOne({ userid: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isAdmin == true && admin.isMainAdmin == false) {
      return res
        .status(403)
        .json("You are not authorized to make changes in the admin profile")
    }
    const hashPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;
    const updatedUser = await User.updateOne(
      { userid: req.params.id },
      {
        $set: {
          username,
          useremail,
          userphonenumber,
          password: hashPassword,
        },
      }
    );
    return res.json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update user" });
  }
});

// Admin Update
router.put("/users/admin/:id", verifyUser, async (req, res) => {
  try {
    const admin = await User.findOne({ userid: req.userid });
    if (!admin.isAdmin && !admin.isMainAdmin) {
      return res.status(403).json({
        message: "You are not authorized to make changes to this user",
      });
    }

    const user = await User.findOne({ userid: req.params.id });
    const makingAdmin = !user.isAdmin;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { userid: req.params.id },
      {
        $set: {
          isAdmin: makingAdmin,
        },
      }
    );
    return res.status(200).json({ user: updatedUser, success: true });
    // return res.json({ user: updatedUser, success:true });
  } catch (error) {
    return res.status(500).json({ error: "Unable to update user" });
  }
});

// User logout
router.post("/logout", verifyUser, (req, res) => {
  try {
    console.log("Cookies before clearing:", req.cookies);
    res.clearCookie("token", { path: "/" });
    console.log("Cookies after clearing:", req.cookies);
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error during logout" });
  }
});

export { router as AdminRouter, verifyUser };
