const express = require("express");

const router = express.Router();
const {
  signupTeacher,
  loginTeacher,
} = require("../controllers/teacherController");

router.post("/", signupTeacher);

router.post("/login", loginTeacher);

module.exports = router;
