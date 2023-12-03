/**
 * It is practice project to learn about mongo database and express
 * Date: 18 Nov 2023
 */
//Inital File

//dependencies
const { readdirSync } = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const studentRoute = require("./routes/studentRoute");
const userRoute = require("./routes/userRoute");

//initialing express
const express = require("express");
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());

//database connection with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/practice")
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

//routes middleware: gets all routes name in an array, from that array through map, adding "api/v1" to all routes url
app.use("/api/student/", studentRoute);
app.use("/api/user", userRoute);

//port
const port = process.env.PORT || 3000;

//generic error handler middleware to catch unhandled errors and log them
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

//listening on port
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
