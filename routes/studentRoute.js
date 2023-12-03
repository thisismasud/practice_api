/**
 * Title: Student Route **This is a complete seperate route just for practice purposes
 * Description: This file handles the Route of studentRoute (Route: {Baseurl}/api/student/)
 * Date: 2023-11-29
 * Author: Masud Parvez
 */

// dependencies
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const checkLogin = require("../middlewares/checkLogin");

// Define your routes and middleware here
router.post("/insertStudent", studentController.insertData);
router.get("/viewStudent", studentController.viewData);
router.post("/updateStudent/:id", studentController.updateData);
router.delete("/deleteStudent/:id", studentController.deleteData);
router.get("/findDhaka", studentController.dhaka);

module.exports = router;
