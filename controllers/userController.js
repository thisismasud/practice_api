/**
 * Title: User Information Controller
 * Description: This file controlles the CRUD operations of userRoute (Route: {Baseurl}/api/user/)
 * Date: 2023-11-29
 * Author: Masud Parvez
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const userController = {};

//for user SIGNUP
userController.insertNewData = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new UserModel({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  });
  try {
    await UserModel.create(newUser);
    res.status(200).json({
      msg: "Data saved successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Couldn't save data",
    });
  }
};

//for user LOGIN
userController.checkData = async (req, res) => {
  try {
    const user = await UserModel.find({ username: req.body.username });
    if (user && user.length > 0) {
      //this function (isValidPassword) return true or false. It is comparing the hash password with req.body.password
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (isValidPassword) {
        //generate token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1 days" }
        );
        res.status(200).json({
          access_token: token,
          message: "Login successful",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed",
        });
      }
    }
  } catch {
    res.status(401).json({
      error: "Authentication failed",
    });
  }
};

userController.viewData = async (req, res) => {
  const id = req.params.id;
  // const Query = {_id: id}
  const projection = { name: 1, username: 1 };

  try {
    const data = await UserModel.findById(id, projection);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = userController;
