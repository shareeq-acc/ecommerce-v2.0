import express from "express";
import catchAsyncErrors from "../../utility/catchAsyncErrors.js";
import authentication from "../../middlewares/authMiddleware.js";
import {
  checkOutOrder,
  getAllOrders,
  getOrder,
  orderPayment,
} from "../../controller/orderController.js";
const router = express.Router();

router.get("/", catchAsyncErrors(getAllOrders));

router.get("/:orderId", catchAsyncErrors(getOrder));

router.post("/", authentication, catchAsyncErrors(checkOutOrder));

router.post("/payment", authentication, catchAsyncErrors(orderPayment));

export default router;
