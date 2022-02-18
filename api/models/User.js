const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, lowercase: true },
    email: {
      type: String,
      required: [true, "Email must have"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide valid email"],
    },
    // password: {
    //   type: "String",
    //   required: [true, "Provide password"],
    //   minlength: 8,
    //   //select: false,
    // },
    birthdate: {
      type: Date,
      default: Date.now,
      max: [Date.now, "Sorry because you come from the future "],
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
