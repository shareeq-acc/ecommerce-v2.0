import { adjustProductQuantity, incrementProductOrders } from "../dbHelpers/products.js";

const decrementProductsQuantity = async (orderItems) => {
  const orderLength = orderItems?.length || 0;
  for (let i = 0; i < orderLength; i++) {
    const productId = orderItems[i].productId;
    const quantityDecrement = orderItems[i].quantity;
    // Multiple quanityDecrement with -1 to make it Negative for Decrement
    await adjustProductQuantity(productId, quantityDecrement * -1);
    await incrementProductOrders(productId)
  }
};

export default decrementProductsQuantity;
