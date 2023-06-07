import express from "express";
import catchAsyncErrors from "../../utility/catchAsyncErrors.js";
import authentication from "../../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/:cartId", authentication, catchAsyncErrors());

export default router;
