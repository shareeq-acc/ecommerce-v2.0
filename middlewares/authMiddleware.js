import jwt from "jsonwebtoken";
import keys from "../config/keys.js";
import ErrorHandler from "../utility/errorHandler.js";
const authentication = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, keys.tokens.access.secret, (err, payload) => {
      if (err) {
        return next(new ErrorHandler(401, "Token Expired or Invalid", {}));
      }
      req.user = payload?.id;
    });
  }
  next();
};

export default authentication;
