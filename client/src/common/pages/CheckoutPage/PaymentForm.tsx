import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../../components/Elements/Button/Button";

const PUBLIC_KEY =
  "pk_test_51LyVsTDU7aeEbZLje58GKHELeqGebDbfvZXYYL2Zt1ORhrQESVY5dMQJTfARowglseuwq1GCV0OZCQxgWQvU8ns000XSXqFOEX";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const CARD_OPTIONS = {
  // iconStyle:'solid',
  style: {
    base: {
      iconColor: "#E90674",
      color: "black",
      fontWeight: 500,
      fontSize: "20px",
      fontFamily: "Quicksand, sans-serif",
      // fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": {
        // color: "#E90674",
        fontFamily: "Quicksand, sans-serif",
      },
    },
    invalid: {
      iconColor: "#E90202",
      "::placeholder": { color: "#E90202" },
    },
  },
};

const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};

const RenderForm = () => {
  return (
    <form className="payment-form checkout-form" onSubmit={handleFormSubmit}>
      {/* <h1 className="payment-form__title">Payment</h1> */}
      <CardElement options={CARD_OPTIONS} />
      <Button className="pay-btn">Pay 109$</Button>
    </form>
  );
};

const PaymentForm = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <RenderForm />
    </Elements>
  );
};

export default PaymentForm;
