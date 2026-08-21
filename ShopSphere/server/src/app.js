import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// ================= CORS =================
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://shopsphere-pied-zeta.vercel.app",
        ],
        credentials: true,
    })
);

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= ROUTES =================
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// ================= HOME ROUTE =================
app.get("/", (req, res) => {
    res.json({
        message: "ShopSphere API is running",
    });
});

// ================= EXPORT =================
export default app;