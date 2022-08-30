const teacherModel = require("../models/teacherModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

const signupTeacher = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await teacherModel.signup(email, password);
    const token = createToken(teacher._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginTeacher = async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await teacherModel.login(email, password);
    const token = createToken(teacher._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupTeacher,
  loginTeacher,
};
