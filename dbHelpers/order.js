import Order from "../models/orderSchema.js";

export const createOrder = async (data) => {
  const createNewOrder = new Order(data);
  await createNewOrder.save();
  return createNewOrder._id;
};

export const fetchAllOrders = async () => {
  return await Order.find({});
};

export const fetchOrderById = async (orderId) => {
  return await Order.findById(orderId);
};

export const findOrdersBasedOnProduct = async (filter, productId) => {
  return await Order.find(filter)
    .where("status")
    .equals("complete")
    .select("orderItems")
    .where("orderItems.productId")
    .equals(productId);
};

export const updateOrderDetails = async (orderId, updateData) => {
  await Order.findByIdAndUpdate(orderId, updateData);
};
