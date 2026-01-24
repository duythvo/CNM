import express from "express";
import upload from "../middlewares/upload.js";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/add", upload.single("image"), createProduct);
router.get("/edit/:id", getProductById);
router.post("/edit/:id", upload.single("image"), updateProduct);
router.get("/delete/:id", deleteProduct);

export default router;
