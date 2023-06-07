import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Button from "../../components/Elements/Button/Button";
import FormWrapper from "../../components/Forms/FormWrapper";
import InputField from "../../components/Forms/InputField";

type FormStateType = "register" | "login";

const AuthPage = () => {
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const [formDetails, setFormDetails] = useState(initialValues);
  const [formState, setFormState] = useState<FormStateType>("login");

  useEffect(() => {
    setFormDetails(initialValues);
  }, [formState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="auth-page container--padding section--margin">
      <div className="form__card">
        <FormWrapper className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__toggle-wrap">
            <div
              className={`auth-form_toggle-tab ${
                formState === "login" && "active"
              }`}
              onClick={() => setFormState("login")}
            >
              Login
            </div>
            <div
              className={`auth-form_toggle-tab ${
                formState === "register" && "active"
              }`}
              onClick={() => setFormState("register")}
            >
              Register
            </div>
          </div>
          {formState === "register" && (
            <div className="form--group double-input-wrap">
              <InputField
                iconName={faUser}
                onChange={handleInputChange}
                placeholderText={"Please Enter Your First Name"}
                value={formDetails.fname}
                name={"fname"}
                className={"double-input"}
              />
              <InputField
                iconName={faUser}
                onChange={handleInputChange}
                placeholderText={"Please Enter Your Last Name"}
                value={formDetails.lname}
                name={"lname"}
              />
            </div>
          )}

          <div className="form--group single-input-wrap">
            <InputField
              iconName={faEnvelope}
              onChange={handleInputChange}
              placeholderText={"Please Enter Your Email Address"}
              value={formDetails.email}
              name={"email"}
            />
          </div>
          <div className="form--group single-input-wrap">
            <InputField
              type={"password"}
              onChange={handleInputChange}
              placeholderText={"Please Enter Your Password"}
              value={formDetails.password}
              name={"password"}
              iconName={faLock}
            />
          </div>

          {formState === "register" && (
            <div className="form--group single-input-wrap">
              <InputField
                type={"password"}
                iconName={faLock}
                onChange={handleInputChange}
                placeholderText={"Please Re-Enter Your Password"}
                value={formDetails.cpassword}
                name={"cpassword"}
              />
            </div>
          )}
          <Button className="form-btn">Submit</Button>
        </FormWrapper>
      </div>
    </div>
  );
};

export default AuthPage;
