import {
  faEnvelopesBulk,
  faHouse,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Elements/Button/Button";
import FormWrapper from "../../components/Forms/FormWrapper";
import InputField from "../../components/Forms/InputField";
import { CheckoutFormType } from "../../types";

type CheckoutFormProps = {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formDetails:CheckoutFormType
};
const CheckoutForm = ({
  handleFormSubmit,
  handleInputChange,
  formDetails
}: CheckoutFormProps) => {
    
  return (
    <FormWrapper className="shipping-form checkout-form" onSubmit={handleFormSubmit}>
      {/* <h1 className="shipping-form__title">Shipping Details</h1> */}
      <InputField
        name={"fullName"}
        placeholderText={"Please Enter Your Full Name"}
        onChange={handleInputChange}
        value={formDetails.fullName}
        iconName={faUser}
        className={"shipping__input-fields"}
      />
      <InputField
        name={"city"}
        placeholderText={"Please Enter Your City Name"}
        onChange={handleInputChange}
        value={formDetails.city}
        iconName={faLocationDot}
        className={"shipping__input-fields"}
      />
      <InputField
        name={"address"}
        placeholderText={"Please Enter Your Shipping Address"}
        onChange={handleInputChange}
        value={formDetails.address}
        iconName={faHouse}
        className={"shipping__input-fields"}
      />
      <InputField
        name={"postalCode"}
        placeholderText={"Please Enter Your Postal Code"}
        type="number"
        onChange={handleInputChange}
        value={formDetails.postalCode}
        iconName={faEnvelopesBulk}
        className={"shipping__input-fields"}
      />
      <Button className="shipping-btn">Confirm</Button>
    </FormWrapper>
  );
};

export default CheckoutForm;
