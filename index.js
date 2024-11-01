/**
 * Title: Discipline- Todo Application
 * This is a Full Stack Todo Application created for practice purpose.
 * This project was done with all the best practices we need consider during building an web application.
 * Author: Masud Parvez
 * Email: thisismasud1@gmail.com
 * Date: 10th October, 2024
 */

//dependencies
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const expressRateLimit = require("express-rate-limit");
const helmet = require("helmet");
const userRouter = require("./src/routes/userRouter")
const dashBoardRouter = require("./src/routes/dashBoardRouter")
const todoRouter = require("./src/routes/todoRouter")

//initializing express
const express = require("express");
const app = express();

//port
const port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }) //this is important to make request from the frontend and set cookies
);
app.use(helmet())
app.use(hpp())
app.use(mongoSanitize())
//request limiter
const limiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})
app.use(limiter)

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//serve static files
app.use(express.static('client/dist'))
app.use('/uploads', express.static('public/uploads'));

//routes
app.use('/api/', userRouter)
app.use('/api/dashboard', dashBoardRouter)
app.use('/api/todo', todoRouter)


//error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        success: false,
        error: {
            msg: err.message
        }
    });
})


//this code snippet serves as a catch-all route that will send the index.html file for any incoming request. Simply it servers the index.html file for any incoming request.
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
// })

//mongoose connection
mongoose
  .connect(process.env.MONGO_URI, { autoIndex: true })
  .then(() => console.log("Connection to MongoDB established"))
  .catch((err) => console.log(err));

//listen app
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

