import express from "express";
const productRouter = express.Router();
import {
  getAllProducts,
  saveProduct,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";
import authUser from "../middlewares/authUser.js";

productRouter.get("/", authUser, getAllProducts);
productRouter.post("/save", authUser, saveProduct);
productRouter.get("/edit/:id", authUser, getProductById);
productRouter.get("/delete/:id", authUser, deleteProduct);

export default productRouter;
