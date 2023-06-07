import crypto from "crypto";
const createHash = () => {
  return crypto.randomBytes(64).toString("hex");
};
export default createHash;
