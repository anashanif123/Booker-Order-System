// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "booker"],
    default: "booker",
  },
});

module.exports = mongoose.model("User", userSchema);
