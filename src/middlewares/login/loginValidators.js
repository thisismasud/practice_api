const {check, validationResult} = require("express-validator");

//login validators
const doLoginValidators = [
    check("username")
        .notEmpty()
        .withMessage("Username is required!")
        .trim()
        .escape(),
    check("password")
        .notEmpty()
        .withMessage("Password is required!")
        .trim()
]

//login validation handler to handle errors
const doLoginValidationHandler = (req, res, next) =>{
    const errors = validationResult(req)
    const mappedErrors = errors.mapped();
    if(Object.keys(mappedErrors).length === 0){
        next()
    }else{
        res.status(500).json({
            error: mappedErrors
        })
    }
}
module.exports = {
    doLoginValidators,
    doLoginValidationHandler
}