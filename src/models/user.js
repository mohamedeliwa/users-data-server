const mongoose = require("mongoose");

// Creating a mongoose Schema for User Model
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    gender: {
      // True for male, False for Female
      type: String,
      required: true,
      default: false,
      enum: ["male", "female"]
    },
  },
  {
    // adding timestamps to each user doucment
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  //   delete userObject.reports;

  return userObject;
};

// Creating a User model.
const User = mongoose.model("User", userSchema);

module.exports = User;
