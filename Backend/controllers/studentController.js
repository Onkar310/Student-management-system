const studentModel = require("../models/studentModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

const signupStudent = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const student = await studentModel.signup(
      firstname,
      lastname,
      email,
      password
    );
    const token = createToken(student._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await studentModel.login(email, password);
    const token = createToken(student._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all students
const getAllStudents = async (req, res) => {
  const students = await studentModel.find({}).sort({ createdAt: -1 });
  res.status(200).json(students);
};

module.exports = {
  signupStudent,
  loginStudent,
  getAllStudents,
};
