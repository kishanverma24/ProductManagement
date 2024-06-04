import express from "express";
import {
  userRegistration,
  userLogin,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  updateAdmin,
  userLogout,
} from "../controllers/authController.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = express.Router();

router.post("/register", userRegistration); //registering user
router.post("/login", userLogin); //user login
router.get("/allusers", verifyUser, getAllUsers); //getting all users
router.get("/users/:id", verifyUser, getSingleUser); //getting single user
router.delete("/users/:id", verifyUser, deleteUser); //deleting user
router.put("/users/:id", verifyUser, updateUser); //updating users
router.put("/users/admin/:id", verifyUser, updateAdmin); //admin update
router.post("/logout", verifyUser, userLogout); //user logout

export default router;
