import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "first name is required"],
      minlength: [2, "Name must be a minimum of 2 characters"],
      maxlength: [64, "Name length must not be less than 64 characters"],
    },

    lastName: {
      type: String,
      trim: true,
      required: [true, "last name is required"],
      minlength: [2, "Name must be a minimum of 2 characters"],
      maxlength: [64, "Name length must be less than 64 characters"],
    },

    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [8, "Password too short"],
      maxlength: [64, "Password too long"],
      validate: {
        validator: validator.isStrongPassword,
        mssage:
          "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and symbol",
      },
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      trim: true,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpiresIn: Date,
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  //check if this document is new
  if (!this.isNew) {
    this.passwordChangedAt = new Date(Date.now() - 1000);
  }

  //check if the the password has been previously modfied
  if (this.isModified("password")) return;

  //hash password
  this.password = await bcrypt.hash(this.password, 14);
});

//login test: check if password provided is match
userSchema.methods.correctPassword = async function (plain, encrpted) {
  return await bcrypt.compare(plain, encrpted);
};

export const User = mongoose.model("User", userSchema);
