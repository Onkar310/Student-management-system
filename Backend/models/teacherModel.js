const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//teacher signup
teacherSchema.statics.signup = async function (email, password) {
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already exist");
  }
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  const user = await this.create({
    email,
    password: hash,
  });
  return user;
};

//teacher login
teacherSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are necessary");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("teacher", teacherSchema);
