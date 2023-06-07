import validatePassword from "./validatePassword.js";

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validateUserForm = ({ fname, lname, email, password, cpassword }) => {
  if (!fname) {
    return {
      success: false,
      formErrors: {
        fname: "Please Enter First Name",
      },
    };
  }
  if (fname.length > 50) {
    return {
      success: false,
      formErrors: {
        fname: "First Name Should Not Exceed 50 Characters",
      },
    };
  }
  if (!lname) {
    return {
      success: false,
      formErrors: {
        lname: "Please Enter Last Name",
      },
    };
  }
  if (lname.length > 50) {
    return {
      success: false,
      formErrors: {
        lname: "Last Name Should Not Exceed 50 Characters",
      },
    };
  }
  if (!email) {
    return {
      success: false,
      formErrors: {
        email: "Please Enter Your Email Address",
      },
    };
  }
  if (email.length > 254) {
    return {
      success: false,
      formErrors: {
        email: "Email Adress Cannot exceed 254 Characters",
      },
    };
  }
  if (!validateEmail(email)) {
    return {
      success: false,
      formErrors: {
        email: "Please Enter a Valid Email Address",
      },
    };

  }
  if (password !== cpassword) {
    return {
      success: false,
      formErrors: {
        cpassword: "Passwords Do Not Match",
        password: "Passwords Do Not Match",
      },
    };
  }
  const isValidPassword = validatePassword(password);
  if (isValidPassword.error) {
    return {
      success: false,
      formErrors: {
        password: isValidPassword?.message || "Invalid Password",
      },
    };
  }

  return {
    success: true,
    formErrors: {},
  };
};

export default validateUserForm;
