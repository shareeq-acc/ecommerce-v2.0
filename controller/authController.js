import ErrorHandler from "../utility/errorHandler.js";
import keys from "../config/keys.js";
import {
  createNewUser,
  getUserByField,
  getUserById,
  saveEmailVericationDetails,
  savePasswordEmailDetails,
  updateUser,
} from "../dbHelpers/user.js";
import validateUserForm from "../utility/validation/validateUserFormFields.js";
import { generateToken, verifyToken } from "../utility/token.js";
import {
  passwordChangeTemplate,
  verificationEmailTemplate,
} from "../config/emailTemplates.js";
import sendEmail from "../utility/sendEmail.js";
import validatePassword from "../utility/validation/validatePassword.js";
import { createCustomer } from "../utility/payment.js";

export const checkUser = async (req, res, next) => {
  const userId = req.user;
  if (!userId) {
    return next(new ErrorHandler(403, "No User", {}));
  }
  return res.status(200).json({
    success: true,
    user: userId,
  });
};

export const refreshAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies["token"];
  if (!refreshToken) {
    return next(
      new ErrorHandler(403, "No Refresh Token", {
        message: "Please Login",
      })
    );
  }

  const isValidToken = verifyToken(refreshToken, "refresh");
  if (!isValidToken.success) {
    return next(
      new ErrorHandler(403, "Invalid or Expired Refresh Token", {
        message: "Please Login",
      })
    );
  }
  const payload = { id: isValidToken.payload.id };
  const accessToken = generateToken("access", payload);

  return res.status(200).json({
    success: true,
    token: accessToken,
  });
};

export const registerUser = async (req, res, next) => {
  const { fname, lname, email, password, cpassword } = req.body;

  const validInputFields = validateUserForm({
    fname,
    lname,
    email,
    password,
    cpassword,
  });
  if (!validInputFields.success) {
    return next(
      new ErrorHandler(400, "Custom Validation Error", {
        formErrors: validInputFields.formErrors,
      })
    );
  }

  const isExisitingEmail = await getUserByField("email", email);
  if (isExisitingEmail) {
    return next(
      new ErrorHandler(400, "Duplicate Email", {
        formErrors: {
          email: "User with this Email already Exists",
        },
      })
    );
  }

  const newUser = await createNewUser({ fname, lname, email, password });
  return res.status(201).json({
    success: true,
    emailVerified: false,
    userId: newUser._id,
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler(400, "Empty Fields", {
        formErrors: {
          main: "Please fill all the Fields",
        },
      })
    );
  }
  const isExistingEmail = await getUserByField("email", email, "+password");
  if (!isExistingEmail) {
    return next(
      new ErrorHandler(401, "Invalid Credentials", {
        formErrors: {
          main: "Invalid Credentials",
        },
      })
    );
  }

  const isValidPassword = await isExistingEmail.validatePassword(password);
  if (!isValidPassword) {
    return next(
      new ErrorHandler(401, "Invalid Credentials", {
        formErrors: {
          main: "Invalid Credentials",
        },
      })
    );
  }

  // Check if Email is Verified
  const emailVerification = isExistingEmail.emailVerification;
  if (!emailVerification.verified) {
    // Email is Not Verified

    if (
      emailVerification.nextEmailRequestTimer > Date.now() &&
      emailVerification.nextEmailRequestTimer !== 0
    ) {
      // Email is Recently Sent
      // 0 is the default value for nextEmailRequestTimer
      return next(
        new ErrorHandler(403, "Unverified Email", {
          formErrors: {
            main: "An Email is Already Sent! Please Check Your Inbox",
          },
          emailVerified: false,
          sendEmail: false,
          userId: isExistingEmail._id,
        })
      );
    } else {
      // Request For a New Email
      return next(
        new ErrorHandler(403, "Unverified Email", {
          sendEmail: true,
          emailVerified: false,
          userId: isExistingEmail._id,
        })
      );
    }
  }

  const payload = {
    id: isExistingEmail._id,
  };
  const accessToken = generateToken("access", payload);
  const refreshToken = generateToken("refresh", payload);

  res.cookie("token", refreshToken, {
    maxAge: keys.tokens.refresh.cookieExpiry,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    token: accessToken,
    userId: isExistingEmail._id,
  });
};

export const logoutUser = (req, res, next) => {
  res.cookie("token", "", {
    maxAge: 0,
    overwrite: true,
  });
  return res.status(200).json({
    success: true,
  });
};

export const sendVerificationEmail = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    // No UserID Provided
    return next(
      new ErrorHandler(400, "Id Not Provided", {
        message: "Please Login",
      })
    );
  }
  const isExistingUser = await getUserByField("_id", userId);
  if (!isExistingUser) {
    // User Does Not Exists
    return next(
      new ErrorHandler(401, "Invalid Id", {
        message: "Please Login",
      })
    );
  }

  if (isExistingUser.emailVerification.verified) {
    //Email Already Verified
    return next(
      new ErrorHandler(400, "Already Validated", {
        message: "Your Email is Already Validated",
      })
    );
  }

  if (
    isExistingUser.emailVerification.nextEmailRequestTimer > Date.now() &&
    isExistingUser.emailVerification.nextEmailRequestTimer !== 0
  ) {
    // Note: 0 is the Default Value for nextEmailRequestTimer
    // Email is Recently Send
    return next(
      new ErrorHandler(400, "Spam Email Request", {
        message: "An Email is Already Sent. Please Check your Inbox.",
      })
    );
  }

  // Create Hash
  const token = generateToken("emailVerification", { id: isExistingUser._id });
  const emailTemplate = verificationEmailTemplate(isExistingUser?.fname, token);
  await sendEmail({
    email: isExistingUser?.email,
    subject: "Email Verification",
    html: emailTemplate,
  });

  // Save Email Details Info To DB
  await saveEmailVericationDetails(isExistingUser._id, token);

  return res.status(200).json({
    success: false,
    message: "Successfully Sent Email! Please Check Your Inbox",
  });
};

export const activateAccount = async (req, res, next) => {
  const { token } = req.params;
  if (!token) {
    return next(new ErrorHandler(403, "Token Not Provided", {}));
  }
  const isValidToken = verifyToken(token, "emailVerification");
  if (!isValidToken.success && isValidToken.expired) {
    // Token is Expired
    return next(
      new ErrorHandler(403, "Token Expired", {
        message: "Sorry, Link is Expired, Please Request Another Email",
      })
    );
  }

  // Search For Token in Database
  const userData = await getUserByField("_id", isValidToken.payload.id);
  const tokenInDb = userData.emailVerification.token;

  if (tokenInDb !== token) {
    // Token Decoded is Not Stored in Database (New Token Must've be Issued, so this  would've been removed )
    return next(
      new ErrorHandler(403, "Token Expired", {
        message: "Sorry, Link is Expired, Please Request Another Email",
      })
    );
  }
  const customerId = await createCustomer({
    name: `${userData.fname} ${userData.lname}`,
    email: userData.email,
  });

  await updateUser(userData._id, {
    emailVerification: {
      verified: true,
      nextEmailRequestTimer: 0,
    },
    customerId,
  });

  return res.sendStatus(200);
};

export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(
      new ErrorHandler(400, "No Email Provided", {
        formErrors: {
          email: "Please Enter an Email",
        },
      })
    );
  }

  const isExistingEmail = await getUserByField("email", email);
  if (!isExistingEmail) {
    return res.status(200).json({
      success: true,
      message:
        "If there is an Account Associated with this Email, An Email would be Sent",
    });
  }

  if (isExistingEmail?.passwordResetNextRequest) {
    if (isExistingEmail.passwordResetNextRequest > Date.now()) {
      // Note: 0 is the Default Value for nextEmailRequestTimer
      // Email is Recently Send
      return res.status(200).json({
        success: true,
        message:
          "If there is an Account Associated with this Email, An Email would be Sent",
      });
    }
  }

  const payload = {
    id: isExistingEmail._id,
  };

  const token = generateToken("passwordEmail", payload);
  const emailTemplate = passwordChangeTemplate(isExistingEmail?.fname, token);
  await sendEmail({
    email: isExistingEmail.email,
    subject: "Password Reset",
    html: emailTemplate,
  });
  await savePasswordEmailDetails(isExistingEmail._id, token);
  return res.status(200).json({
    success: true,
    message:
      "If there is an Account Associated with this Email, An Email would be Sent",
  });
};

export const resetPasswordViaEmail = async (req, res, next) => {
  const { token } = req.params;
  const { password, cpassword } = req.body;
  if (!token) {
    return next(new ErrorHandler(403, "Token Not Provided", {}));
  }
  const isValidToken = verifyToken(token, "passwordEmail");
  if (!isValidToken.success) {
    return next(
      new ErrorHandler(403, "Invalid Token", {
        message: "Link has been Expired, Please Request another Email",
      })
    );
  }
  const isExistingUser = await getUserById(isValidToken.payload.id);
  if (!isExistingUser) {
    return next(
      new ErrorHandler(403, "Invalid Token", {
        message: "Link has been Expired, Please Request another Email",
      })
    );
  }
  if (cpassword !== password) {
    return next(
      new ErrorHandler(400, "Passwords Do Not Match", {
        message: "Passwords Do Not Match",
      })
    );
  }
  const isValidPassword = validatePassword(password);
  if (isValidPassword.error) {
    return next(
      new ErrorHandler(400, "Invalid Password", {
        message: isValidPassword?.message || "Invalid Password",
      })
    );
  }
  const hashedPassword = await isExistingUser.hashPassword(password);
  await updateUser(isValidToken.payload.id, { password: hashedPassword });
  return res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
};
