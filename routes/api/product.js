import express from "express";
import upload from "../../config/multer.js";
import catchAsyncErrors from "../../utility/catchAsyncErrors.js";
import authentication from "../../middlewares/authMiddleware.js";
import {
  changeProductImage,
  createNewProduct,
  deleteProduct,
  findAllProducts,
  findHomeProducts,
  getProduct,
  searchProduct,
  updateProduct,
} from "../../controller/productsController.js";
import adminAuthentication from "../../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.post(
  "/",
  upload.array("photos"),
  authentication,
  adminAuthentication,
  catchAsyncErrors(createNewProduct)
);

router.get("/", catchAsyncErrors(findAllProducts));

router.get("/home", catchAsyncErrors(findHomeProducts));

router.get("/:productSlug", catchAsyncErrors(getProduct));

router.post("/search", catchAsyncErrors(searchProduct));

router.delete(
  "/:productId",
  authentication,
  adminAuthentication,
  catchAsyncErrors(deleteProduct)
);

router.put(
  "/:productId",
  authentication,
  adminAuthentication,
  catchAsyncErrors(updateProduct)
);

router.put(
  "/productImage/:productId",
  upload.single("photos"),
  authentication,
  adminAuthentication,
  catchAsyncErrors(changeProductImage)
);

export default router;
