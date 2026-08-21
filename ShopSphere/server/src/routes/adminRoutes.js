import express from "express";
import { getAdminStats, getRecentOrders, getAllOrders, updateOrderStatus, } from "../controllers/adminController.js";
import { protect, admin, } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, admin, getAdminStats);
router.get("/recent-orders", protect, admin, getRecentOrders);
router.get("/orders", protect, admin, getAllOrders);
router.put("/orders/:id/status", protect, admin, updateOrderStatus);

export default router;