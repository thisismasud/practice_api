const {check, validationResult} = require("express-validator")
const UserModel = require("../../models/UserModel")
const {unlink} = require("fs")
const path = require("path")

//this signupValidator is an array of middlewares, where every check function is a middleware
const signupValidators = [
    //username validation
    check("username")
        .notEmpty()
        .withMessage("Username is required!")
        .trim()
        .escape()
        .isLength({min: 3, max: 20})
        .withMessage("Username must be between 3 to 20 characters long!")
        .isAlphanumeric()
        .withMessage("Username can only contain letters and numbers!")
        .custom(async(value) =>{
            const user = await UserModel.findOne({username: value})
            if(user){
                throw new Error("Username already exists!")
            }
        }),

    //email validation
    check('email')
        .normalizeEmail()
        .isEmail()
        .notEmpty()
        .withMessage("Invalid email address!")
        .custom(async(value) =>{
            const userEmail = await UserModel.findOne({email: value})
            if (userEmail) {
                throw new Error("Email already exists")
            }
        }),

    //password validation
    check('password')
        .trim()
        .notEmpty()
        .withMessage("Password can't be empty!")
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one" +
            " lowercase letter, one number and one special character!"),

    //confirm password validation
    check('confirmPassword')
        .trim()
        .notEmpty()
        .withMessage("Confirm password can't be empty!")
        .custom(async (value, {req}) =>{
            if(value !== req.body.password) {
                throw new Error("Password didn't match!")
            }
        })

]

//signup user validation handler, gets all the errors (if any) and maps them to an object
const signupUserValidationHandler = (req, res, next)=>{
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()
    if(Object.keys(mappedErrors).length === 0){
        next()
    }else{
        if(req.file){
            const {filename} =req.file;
            const filepath = path.join(__dirname, `../../../public/uploads/avatars/${filename}`)
            unlink(filepath, (err) =>{
                if(err){
                    console.log(err)
                }
            })
        }
        res.status(500).json({
            errors: mappedErrors
        })
    }
}

//exports
module.exports = {
    signupValidators,
    signupUserValidationHandler
}