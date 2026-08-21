import express from "express";
import { getProducts, getProductById, createProduct, updateProducts, deleteProduct, } from "../controllers/productController.js";
import { protect, admin, } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProducts);
router.delete("/:id", protect, admin, deleteProduct);

export default router;