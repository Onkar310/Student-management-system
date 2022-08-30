require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
app.use(express.json());
app.use(cors());
app.use("/api/students", studentRoutes);
app.use("/api/teacher", teacherRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(
    app.listen(process.env.PORT, () => {
      console.log(
        `server is up and running on port ${process.env.PORT} and connect to Database`
      );
    })
  )
  .catch((err) => {
    console.log(err);
  });
