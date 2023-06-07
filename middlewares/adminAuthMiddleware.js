import { getUserByField } from "../dbHelpers/user.js";

const adminAuthentication = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      auth: false,
      message: "Please Login",
    });
  }
  const isExistingUser = await getUserByField("_id", req.user, "admin");
  if (!isExistingUser) {
    return res.status(401).json({
      success: false,
      auth: false,
      message: "Please Login",
    });
  }

  if (!isExistingUser.admin) {
    return res.status(403).json({
      success: false,
      auth: false,
      message: "Unauthorized",
    });
  }
  next();
};

export default adminAuthentication;
