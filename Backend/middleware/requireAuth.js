const jwt = require("jsonwebtoken");
const studentModel = require("../models/studentModel");
const student = require("../models/studentModel");
const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Auth token is required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await studentModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Not authorized request" });
  }
};

module.exports = requireAuth;
