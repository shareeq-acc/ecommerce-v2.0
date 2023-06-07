import { useState } from "react";
import PaymentForm from "./PaymentForm";
import CheckoutForm from "./CheckoutForm";
import { CheckoutFormType } from "../../types";
import Reciept from "./Reciept";
import Button from "../../components/Elements/Button/Button";

const CheckoutPage = () => {
  const initialData = {
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  };
  const [showStage, setShowStage] = useState<number>(2);
  const [shippingDetails, setShippingDetails] =
    useState<CheckoutFormType>(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleShippingFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowStage(3);
  };
  return (
    <div className="checkout-page container--padding section--margin">
      <div className="checkout-page__tabs-wrapper">
        <Button
          className={`checkout-page__tab checkout-page__stage-1-tab ${
            showStage > 0 ? "checkout-page__tab--active" : ""
          }`}
          
        >
          Product Selection
        </Button>
        <Button
          className={`checkout-page__tab ${
            showStage > 1 ? "checkout-page__tab--active" : ""
          }`}
        >
          Shipping Information
        </Button>
        <Button
          className={`checkout-page__tab ${
            showStage > 2 ? "checkout-page__tab--active" : ""
          }`}
        >
          Payment Information
        </Button>
      </div>
      <div className="checkout-page__content">
        <Reciept />
        {showStage === 2 && (
          <CheckoutForm
            handleFormSubmit={handleShippingFormSubmit}
            handleInputChange={handleInputChange}
            formDetails={shippingDetails}
          />
        )}
        {showStage === 3 && <PaymentForm />}
      </div>
    </div>
  );
};

export default CheckoutPage;
