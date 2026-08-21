import express from "express";
import { registerUser, loginUser, } from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/admin-test", protect, admin, (req, res) => {
    res.json({
        message: "Welcome Admin",
        user: req.user,
    });
});

export default router;