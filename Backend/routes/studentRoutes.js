const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
const {
  signupStudent,
  loginStudent,
  getAllStudents,
} = require("../controllers/studentController");

router.post("/", signupStudent);

router.post("/login", loginStudent);
router.use(requireAuth);
router.get("/", getAllStudents);

module.exports = router;
