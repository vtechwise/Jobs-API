const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name "],
    minlegnth: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email "],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password "],
    minlegnth: 6,
    maxlength: 12,
  },
});

UserScheme.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
  next();
});

module.exports = mongoose.model("User", UserScheme);
