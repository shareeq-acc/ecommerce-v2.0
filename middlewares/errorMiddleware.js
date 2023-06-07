const errorMiddleware = (error, req, res, next) => {
  console.log("Error Name: ", error.name);
  console.log(error.message)
  error.message = error.message || "Internal Server Error";
  error.statusCode = error.statusCode || 500;

  // Validation Error
  // if (error.name === "ValidationError") {
  //   let errors = {};
  //   Object.keys(error.errors).forEach((key) => {
  //     errors[key] = error.errors[key].message;
  //   });

  //   if (error.message.includes("User validation failed")) {
  //     // Validation Error User Schema
  //     error.errorsObject = {
  //       formErrors: errors,
  //     };
  //   }
  // }

  error.responsePayload = error.responsePayload || { serverError: true };
  res.status(error.statusCode).json({
    success: false,
    ...error.responsePayload,
  });
};
export default errorMiddleware;
