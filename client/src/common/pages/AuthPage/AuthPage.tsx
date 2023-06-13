import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Button from "../../components/Elements/Button/Button";
import FormWrapper from "../../components/Forms/FormWrapper";
import InputField from "../../components/Forms/InputField";
import { useLoginUserMutation, useRegisterUserMutation } from "../../../features/api/authApi";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/token";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { setUser } from "../../../features/auth/authSlice";


type FormStateType = "register" | "login";
export type LoginType = {
  email: string,
  password: string
}
export type RegisterType = LoginType & {
  cpassword: string,
  fname: string,
  lname: string,
}

type AuthFormType = RegisterType
const AuthPage = () => {
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const initialErrors = {
    main: "",
    ...initialValues
  }
  const [formDetails, setFormDetails] = useState<AuthFormType>(initialValues);
  const [formState, setFormState] = useState<FormStateType>("login");
  const [errors, setErrors] = useState(initialErrors)
  const [loginUser] = useLoginUserMutation()
  const [registerUser] = useRegisterUserMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setFormDetails(initialValues);
    setErrors(initialErrors)
  }, [formState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formState === 'login') {
        const loginData = await loginUser({ email: formDetails.email, password: formDetails.password }).unwrap()
        if (loginData.token) {
          setToken('token', loginData.token)
          dispatch(setUser({ name: loginData.userId!, token: loginData.token }))
          navigate("/")
        }
      } else {
        await registerUser(formDetails).unwrap()
      }
    } catch (err: any) {
      if (err?.data?.status === 500) {
        setErrors({ ...initialErrors, main: "Something Went Wrong" })
      } else if (err?.data?.formErrors) {
        setErrors({ ...initialErrors, ...err?.data?.formErrors })
      }

    }

  };

  return (
    <div className="auth-page container--padding section--margin">
      <div className="form__card">
        <FormWrapper className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__toggle-wrap">
            <div
              className={`auth-form_toggle-tab ${formState === "login" && "active"
                }`}
              onClick={() => setFormState("login")}
            >
              Login
            </div>
            <div
              className={`auth-form_toggle-tab ${formState === "register" && "active"
                }`}
              onClick={() => setFormState("register")}
            >
              Register
            </div>
          </div>
          <h3>{errors.main}</h3>
          {formState === "register" && (
            <div className="form--group double-input-wrap">
              <InputField
                iconName={faUser}
                onChange={handleInputChange}
                placeholderText={"Please Enter Your First Name"}
                value={formDetails.fname}
                name={"fname"}
                className={"double-input"}
                error={errors.fname}
              />
              <InputField
                iconName={faUser}
                onChange={handleInputChange}
                placeholderText={"Please Enter Your Last Name"}
                value={formDetails.lname}
                name={"lname"}
                error={errors.lname}
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
              error={errors.email}
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
              error={errors.password}
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
                error={errors.cpassword}
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
