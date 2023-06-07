// (/^
// (?=.*\d)                //should contain at least one digit
// (?=.*[a-z])             //should contain at least one lower case
// (?=.*[A-Z])             //should contain at least one upper case
// [a-zA-Z0-9]{8,}         //should contain at least 8 from the mentioned characters
// $/)

// Validation in one Line
// const validatePassword = (password) => {
//   const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
//   return re.test(password);
// };

const validatePassword = (password) => {
  if (password.length < 8) {
    return {
      error: true,
      message: "Password Must be atleast 8 Characters",
    };
  }
  if (password.length > 50) {
    return {
      error: true,
      message: "Password Cannot Exceed 50 Characters",
    };
  }
  if (password.search(/[a-z]/) < 0) {
    return {
      error: true,
      message: "Password Must Contain alteast One Lower Case Character",
    };
  }
  if (password.search(/[A-Z]/) < 0) {
    return {
      error: true,
      message: "Password Must Contain alteast One Uppercase Character",
    };
  }
  if (password.search(/[0-9]/) < 0) {
    return {
      error: true,
      message: "Password must contain atleast One Digit.",
    };
  }
  return {
    error: false,
  };
};
export default validatePassword;
