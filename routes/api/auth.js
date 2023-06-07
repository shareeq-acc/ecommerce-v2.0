import express from "express";
import catchAsyncErrors from "../../utility/catchAsyncErrors.js";
import authentication from "../../middlewares/authMiddleware.js";
import {
  activateAccount,
  checkUser,
  forgetPassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPasswordViaEmail,
  sendVerificationEmail,
} from "../../controller/authController.js";
import { getAllUsers } from "../../dbHelpers/user.js";
const router = express.Router();

// Get All Users (for development)
router.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.status(200).json({
    success: true,
    users,
  });
});

// Check If User is Logged Inn
router.get("/check", authentication, catchAsyncErrors(checkUser));

// Refresh Access Token
router.get("/refresh", catchAsyncErrors(refreshAccessToken));

// Register User
router.post("/register", catchAsyncErrors(registerUser));

// Login User
router.post("/login", catchAsyncErrors(loginUser));

// Logout User
router.delete("/logout", catchAsyncErrors(logoutUser));

// Send Verification Email
router.post("/send-email", catchAsyncErrors(sendVerificationEmail));

// Activate Account
router.get("/activate/:token", catchAsyncErrors(activateAccount));

// Send Password Reset Email
router.post("/forget", catchAsyncErrors(forgetPassword));

// Reset Password Via Email
router.put("/reset/:token", catchAsyncErrors(resetPasswordViaEmail));

export default router;
