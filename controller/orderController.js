import ErrorHandler from "../utility/errorHandler.js";
import { getUserByField, getUserById, updateUser } from "../dbHelpers/user.js";
import {
  calculateOrderPrice,
  validateShippingAddress,
} from "../utility/validation/validateOrder.js";
import {
  createOrder,
  fetchAllOrders,
  fetchOrderById,
  updateOrderDetails,
} from "../dbHelpers/order.js";
import { createPayment } from "../utility/payment.js";
import decrementProductsQuantity from "../utility/decrementProductsQuantity.js";
import { CASH_ON_DELIVERY } from "../constants/index.js";
import { orderConfirmationEmail } from "../config/emailTemplates.js";
import sendEmail from "../utility/sendEmail.js";

export const getAllOrders = async (req, res) => {
  const orders = await fetchAllOrders();
  return res.status(200).json({
    success: true,
    orders,
  });
};

export const getOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const isExistingOrder = await fetchOrderById(orderId);
  if (!isExistingOrder) {
    return next(
      new ErrorHandler(400, "Order Does Not Exists", {
        auth: false,
        message: "Order Does Not Exists",
      })
    );
  }
  return res.status(200).json({
    success: true,
    order: isExistingOrder,
  });
};

export const checkOutOrder = async (req, res, next) => {
  const { orderItems, shippingAddress, paymentMethod, shippingPrice } =
    req.body;

  const userId = req.user;
  if (!userId) {
    return next(
      new ErrorHandler(401, "No User", {
        auth: false,
        message: "Please Login to Continue",
      })
    );
  }

  const isExistingUser = await getUserById(userId);
  if (!isExistingUser) {
    return next(
      new ErrorHandler(401, "No User", {
        auth: false,
        message: "Please Login Again",
      })
    );
  }

  // Presence Check
  if (
    !orderItems?.length ||
    !paymentMethod ||
    !shippingAddress ||
    !shippingPrice
  ) {
    return next(new ErrorHandler(400, "Presence Error : Order", {}));
  }

  // Validate Shipping Address Provided By The User
  const isValidShippingAddress = validateShippingAddress(shippingAddress);
  if (!isValidShippingAddress.success) {
    return next(
      new ErrorHandler(400, "Order Validation Error", {
        orderValidationErrors: {
          shippingAddress: isValidShippingAddress?.errors || {},
        },
      })
    );
  }

  const orderPrice = await calculateOrderPrice({ orderItems, shippingPrice });
  if (!orderPrice.success) {
    return next(new ErrorHandler(400, "Order Validation Error", {}));
  }

  const orderId = await createOrder({
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    total: orderPrice.total,
    itemPrice: orderPrice.itemPrice,
    user: userId,
    status: paymentMethod === CASH_ON_DELIVERY ? "complete" : "incomplete",
  });

  let ordersArray = isExistingUser?.orders;
  if (isExistingUser?.orders?.length > 0) {
    ordersArray.push(orderId);
  } else {
    ordersArray = [orderId];
  }

  await updateUser(isExistingUser._id, {
    orders: ordersArray,
  });
  await decrementProductsQuantity(orderItems);

  if (paymentMethod === CASH_ON_DELIVERY) {
    const emailTemplate = orderConfirmationEmail(isExistingUser.fname);
    await sendEmail({
      email: isExistingUser?.email,
      subject: "Order Confirmation",
      html: emailTemplate,
    });
  }

  res.status(200).json({
    success: true,
    orderId,
  });
};

export const orderPayment = async (req, res, next) => {
  const userId = req.user;
  const { orderId, paymentMethodId } = req.body;

  if (!userId) {
    return next(
      new ErrorHandler(401, "No User", {
        auth: false,
        message: "Please Login to Continue",
      })
    );
  }

  const isExistingUser = await getUserById(userId);
  if (!isExistingUser) {
    return next(
      new ErrorHandler(401, "No User", {
        auth: false,
        message: "Please Login Again",
      })
    );
  }

  const customerId = isExistingUser.customerId;

  const isValidOrder = await fetchOrderById(orderId);
  if (!isValidOrder) {
    return next(
      new ErrorHandler(400, "Invalid Order", {
        message: "Order Does Not Exists, \n It May Be Deleted",
      })
    );
  }

  if (isValidOrder.paymentMethod !== "card") {
    return next(new ErrorHandler(400, "Different Payment Method", {}));
  }

  const amount = isValidOrder.total;
  const payment = await createPayment({ amount, paymentMethodId, customerId });

  if (!payment.success) {
    return next(
      new ErrorHandler(401, "Payment Failed", {
        message: "Payment Failed, \n Please Refresh the Page and Try Again",
      })
    );
  }

  await updateOrderDetails(orderId, {
    isPaid: true,
    paidAt: Date.now(),
    status: "complete",
  });

  const emailTemplate = orderConfirmationEmail(isExistingUser.fname);
  await sendEmail({
    email: isExistingUser?.email,
    subject: "Order Confirmation",
    html: emailTemplate,
  });

  return res.status(200).json({
    success: true,
  });
};
