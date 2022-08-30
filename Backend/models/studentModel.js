const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const StudentSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//student signup

StudentSchema.statics.signup = async function (
  firstname,
  lastname,
  email,
  password
) {
  if (!email || !password) {
    throw Error("All fields are necessary");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Error("Email already exists");
  }

  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  const student = await this.create({
    firstname,
    lastname,
    email,
    password: hash,
  });
  return student;
};

//student login

StudentSchema.statics.login = async function (email, password) {
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

const studentModel = mongoose.model("studentModel", StudentSchema);

module.exports = studentModel;
