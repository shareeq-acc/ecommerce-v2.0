import User from "../models/userSchema.js";
import keys from "../config/keys.js";
export const getAllUsers = async () => {
  return await User.find({});
};

export const getUserByField = async (field, value, optionalSelection) => {
  if (optionalSelection) {
    return await User.findOne({ [field]: value }).select(optionalSelection);
  } else {
    return await User.findOne({ [field]: value });
  }
};

export const getUserById = async (userId, optionalSelection) => {
  if (optionalSelection) {
    return await User.findById(userId).select(optionalSelection);
  } else {
    return await User.findById(userId);
  }
};

export const createNewUser = async (data) => {
  const newUser = new User(data);
  await newUser.save();
  return newUser;
};

export const saveEmailVericationDetails = async (id, token) => {
  await User.findByIdAndUpdate(id, {
    emailVerification: {
      verified: false,
      nextEmailRequestTimer:
        Date.now() + keys.tokens.emailVerification.spamTimer,
      token: token,
    },
  });
};

export const activate = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    emailVerification: {
      verified: true,
      nextEmailRequestTimer: 0,
    },
  });
};

export const savePasswordEmailDetails = async (userId, token) => {
  await User.findByIdAndUpdate(userId, {
    passwordResetToken: token,
    passwordResetNextRequest: Date.now() + keys.tokens.passwordEmail.spamTimer,
  });
};

export const updateUser = async (userId, data) => {
  await User.findByIdAndUpdate(userId, data);
};
