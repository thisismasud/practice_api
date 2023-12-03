/**
 * Title: User Route
 * Description: This file handles the Route of userRoute (Route: {Baseurl}/api/user/)
 * Date: 2023-11-29
 * Author: Masud Parvez
 */

//dependencies
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkLogin = require("../middlewares/checkLogin");

// Define your routes and middleware here
router.post("/signup", userController.insertNewData);
router.post("/login", userController.checkData);
router.get("/viewData/:id", checkLogin, userController.viewData);

module.exports = router;
