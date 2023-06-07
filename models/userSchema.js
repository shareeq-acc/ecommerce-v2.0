import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;
const hashRounds = 10;
const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, "Field Cannot be Empty"],
      trim: true,
      maxLength: [50, "First Name Should Not Exceed 50 Characters"],
    },
    lname: {
      type: String,
      required: [true, "Field Cannot be Empty"],
      trim: true,
      maxLength: [50, "Last Name Should Not Exceed 50 Characters"],
    },
    email: {
      type: String,
      required: [true, "Field Cannot be Empty"],
      unique: [true, "User with this Email Already Exists"],
      maxLength: [254, "Email Adress is too Long"],
    },
    password: {
      type: String,
      required: [true, "Field Cannot be Empty"],
      select: false,
    },
    emailVerification: {
      verified: {
        type: Boolean,
        default: false,
      },
      nextEmailRequestTimer: {
        // To Avoid Spam
        type: Number, //Seconds
      },
      token: {
        type: String,
      },
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetNextRequest: {
      // To Avoid Spam
      type: Number, //Seconds
    },
    admin: {
      type: Boolean,
      default: false,
    },
    customerId: {
      type: String, // For Payments
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    // securityPin: {
    //   type: String,
    //   maxLength: [4, "Security Pin Should be Four Numbers"],
    //   minLength: [4, "Security Pin Should be Four Numbers"],
    //   select: false,
    // },
  },
  { timestamps: true }
);

userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(hashRounds);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    console.log(err.message);
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

userSchema.methods.hashPassword = async function hashPassword(password) {
  const salt = await bcrypt.genSalt(hashRounds);
  return bcrypt.hash(password, salt);
};

const User = mongoose.model("User", userSchema);
export default User;
