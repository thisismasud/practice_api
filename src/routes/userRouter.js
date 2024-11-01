
//This is the route for user CRUD operation
// noinspection JSCheckFunctionSignatures

const express = require("express");
const router = express.Router();
const {signup, login, logout, updateUser, getUser, deleteUser} = require("../controllers/userController")
const checkLogin = require("../middlewares/common/checkLogin")
const avatarUpload = require("../middlewares/users/avatarUpload")

const {signupValidators, signupUserValidationHandler} = require("../middlewares/users/userValidators")

const {doLoginValidators, doLoginValidationHandler} = require("../middlewares/login/loginValidators")
const multer = require("multer")
const upload = multer()

//all the routers
router.post('/', upload.none(), doLoginValidators, doLoginValidationHandler, login)
router.post('/signup', avatarUpload, signupValidators, signupUserValidationHandler, signup)
router.get('/logout', logout)
router.post('/update_role/:id', checkLogin, updateUser)
router.delete('/user/:id', checkLogin,  deleteUser)
router.get('/getalluser', checkLogin, getUser)


module.exports = router;

