import Stripe from "stripe";
import keys from "../config/keys.js";
const stripe = new Stripe(keys.payment.secretKey);

export const createCustomer = async ({ name, email }) => {
  const customer = await stripe.customers.create({
    name,
    email,
  });
  return customer.id;
};

export const createPayment = async ({
  amount,
  paymentMethodId,
  customerId,
}) => {
  try {
    await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      description: "Order",
      payment_method: paymentMethodId,
      customer: customerId,
      confirm: true,
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
    };
  }
};
