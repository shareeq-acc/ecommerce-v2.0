import express from "express";
const router = express.Router();

import authRoutes from "./api/auth.js";
import productRoutes from "./api/product.js";
import cartRoutes from "./api/cart.js";
import orderRoutes from "./api/order.js";
import reviewRoutes from "./api/review.js";

// Api Routes
router.use("/auth", authRoutes);
router.use("/product", productRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
router.use("/review", reviewRoutes);

export default router;
