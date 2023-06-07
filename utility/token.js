import jwt from "jsonwebtoken";
import keys from "../config/keys.js";

const { tokens } = keys;

export const generateToken = (tokenName, payload) => {
  return jwt.sign(payload, tokens[tokenName].secret, {
    expiresIn: tokens[tokenName].expiry,
  });
};

export const verifyToken = (token, tokenName) => {
  try {
    const payload = jwt.verify(token, tokens[tokenName].secret);
    return {
      success: true,
      payload,
    };
  } catch (error) {
    console.log(error.message);
    if (error.message.includes("jwt expired")) {
      return {
        success: false,
        expired: true,
      };
    } else {
      return {
        success: false,
        expired: false,
      };
    }
  }
};

