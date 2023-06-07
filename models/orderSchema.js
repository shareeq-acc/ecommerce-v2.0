import mongoose from "mongoose";
const { Schema } = mongoose;
import { paymentOptions } from "../constants/index.js";
const orderSchema = new Schema({
  orderItems: [
    {
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    province: { type: String, required: true },
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  paymentMethod: {
    type: String,
    enum: paymentOptions,
    required: true,
  },
  status: {
    type: String,
    enum: ["incomplete", "complete"],
    required: true,
    default: "incomplete",
  },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  delievered: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
