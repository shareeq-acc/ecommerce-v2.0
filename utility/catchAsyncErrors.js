const catchAsyncErrors = (prevFunction) => (req, res, next) => {
  Promise.resolve(prevFunction(req, res, next)).catch(next);
};
export default catchAsyncErrors;
