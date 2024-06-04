import express from "express";
import {
  addingProduct,
  getSingleProduct,
  getAllProduct,
  getProfilePageProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import { verifyUser } from "../middleware/verifyUser.js";
const router = express.Router();
router.post("/add", verifyUser, addingProduct);
router.get("/allproduct", verifyUser, getAllProduct);
router.get("/allproduct/:profileid", verifyUser, getProfilePageProduct);
router.get("/product/:id", verifyUser, getSingleProduct);
router.delete("/delete/:id", verifyUser, deleteProduct);
router.put("/update/:id", verifyUser, updateProduct);

export default router;
