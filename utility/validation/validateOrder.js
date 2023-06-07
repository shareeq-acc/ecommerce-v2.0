import { findProductById } from "../../dbHelpers/products.js";

export const validateShippingAddress = (shippingAddress) => {
  if (!shippingAddress.fullName || shippingAddress?.fullName?.length === 0) {
    return {
      success: false,
      errors: {
        fullName: "Please Enter Your Full Name",
      },
    };
  }
  if (shippingAddress.fullName.length > 100) {
    return {
      success: false,
      errors: {
        fullName: "Please Enter a Valid Full Name",
      },
    };
  }
  if (!shippingAddress.address || shippingAddress?.address?.length === 0) {
    return {
      success: false,
      errors: {
        address: "Please Enter Your Address",
      },
    };
  }
  if (shippingAddress.address.length > 150) {
    return {
      success: false,
      errors: {
        address: "Please Enter a Valid Address",
      },
    };
  }
  if (
    !shippingAddress.postalCode ||
    shippingAddress?.postalCode?.length === 0
  ) {
    return {
      success: false,
      errors: {
        postalCode: "Please Enter Your Postal Code",
      },
    };
  }
  if (isNaN(shippingAddress.postalCode)) {
    return {
      success: false,
      errors: {
        postalCode: "Postal Code Must Be Only Digits",
      },
    };
  }
  if (shippingAddress.postalCode?.length !== 5) {
    return {
      success: false,
      errors: {
        postalCode: "Postal Code Must Be 5 Digits",
      },
    };
  }
  if (!shippingAddress.city || shippingAddress?.city?.length === 0) {
    return {
      success: false,
      errors: {
        city: "Please Select Your City",
      },
    };
  }
  if (shippingAddress.city?.length > 50) {
    return {
      success: false,
      errors: {
        city: "Invalid City",
      },
    };
  }
  return {
    success: true,
  };
};

export const calculateOrderPrice = async ({ orderItems, shippingPrice }) => {
  let totalPrice = 0;
  let error = false;
  let errorMessage = ""
  let index = 0;
  const orderLength = orderItems?.length || 0;

  if (isNaN(shippingPrice)) {
    // Invalid Shipping Price
    error = true;
  }
  while (error === false && index < orderLength) {
    if (
      isNaN(orderItems[index].quantity) ||
      !orderItems[index].quantity ||
      !orderItems[index].productId
    ) {
      // Invalid / undefinded Quantity/ Product Id
      error = true;
    } else {
      try {
        // Find Product
        const isExistingProduct = await findProductById(
          orderItems[index].productId
        );
        if (!isExistingProduct) {
          // Product Does Not Exists with the given Id
          error = true;
        } else {
          // Increment Total Price
          totalPrice =
            totalPrice + isExistingProduct.price * orderItems[index].quantity;
        }
      } catch (error) {
        console.log(error.message);
        error = true;
      }
    }
    index++;
  }
  if (error) {
    return {
      success: false,
      message:errorMessage
    };
  } else {
    return {
      success: true,
      itemPrice: totalPrice,
      total: totalPrice + shippingPrice,
    };
  }
};
