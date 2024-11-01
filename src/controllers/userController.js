//This is login and signup controller, it wil handle user login and signup

const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signupHelper =require("../helpers/signupHelper")

const signup = async (req, res) =>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser;

    if(req.file){
        console.log("file name found" + req.file.filename)
        newUser = new UserModel({
            ...req.body,
            avatar: req.file.filename,
            password: hashedPassword
        })
    }else{
        newUser = new UserModel({
            ...req.body,
            password: hashedPassword
        })
    }

    try{
        //check if user is trying to be admin (exp: passing role: "admin") in signup
        const isSignupAllowed = await signupHelper(newUser);
        if(isSignupAllowed === false){
            return res.status(401).json({
                success: false,
                error: {
                    msg: "Invalid credentials, You don't have permission to become admin or moderator"
                }
            })
        }
        //save user to database
        const result = await UserModel.create(newUser);
        res.status(201).json({
            success: true,
            msg: "User created successfully",
            data: result
        })

    }catch(err){
        res.status(500).json({
            success: false,
            error:{
                msg: err.message
            }
        })
    }
}

const login = async (req, res) => {
    console.log(req.body.password)
    try{
        const user = await UserModel.findOne({username: req.body.username})

        if(user && user._id){
            //compare password
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);

            if(isValidPassword){
                //user object for token
                const userObject = {
                    userId: user._id,
                    username: user.username,
                    avatar: user.avatar || null,
                    role: user.role || 'user'
                }

                //generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});

                //assign cookies
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                    signed: true
                })

                res.status(200).json({
                    success: true,
                    msg: "Login successful",
                })

            }else{
                res.status(404).json({
                    success: false,
                    error: {
                        msg: "Authentication failure"
                    }
                })
            }
        }else{
            res.status(404).json({
                success: false,
                error: {
                    msg: "Authentication Failure"
                }
            })
        }
    }catch(err){
        res.status(500).json({
            success: false,
            error: {
                msg: err.message
            }
        })
    }
}

const logout = (req, res) => {
    try{
        res.clearCookie(process.env.COOKIE_NAME);
        res.status(200).json({
            success: true,
            msg: "Logout successful"
        })
    }catch(err){
        res.status(500).json({
            success: false,
            error: {
                msg: err.message
            }
        })
    }
}

const updateUser = async(req, res) => {
    const userId = req.params.id;
    const {role} = req.body;

    try{
        //check if the logged-in user is admin
        if(req.user.role !== 'admin'){
             return res.status(401).json({
                success: false,
                error: {
                    msg: "You are not authorized to perform this action man"
                }
            })
        }

        // Ensure the 'role' field exists before updating
        if (!role) {
            return res.status(400).json({
                success: false,
                error: {
                    msg: "Role field is required."
                }
            });
        }

        //// Update only the 'role' field
        const updatedUser = await UserModel.updateOne({_id: userId}, {$set: {role}})

        //check if the update was successful or not
        if (updatedUser.modifiedCount === 1) {
            return res.status(200).json({
                success: true,
                msg: "User updated successfully"
            })
        } else {
            return res.status(404).json({
                success: false,
                error: {
                    msg: "User update cannot be done."
                }
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            error: {
                msg: err.message
            }
        })
    }
}

const getUser = async(req, res) =>{
    try{
        const role = req.user.role;

        //check if the logged-in user is admin
        if(role !== 'admin'){
            return res.status(401).json({
                success: false,
                error: {
                    msg: "You are not authorized to to see all the user"
                }
            })
        }
        //find all the user
        const user = await UserModel.find().sort('-createdAt')
        res.status(200).json({
            success: true,
            msg: "User fetched successfully",
            data: user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            error: {
                msg: err.message
            }
        })
    }
}

const deleteUser = async(req, res) =>{
    const userId = req.params.id;
    try{
        const user = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            msg: "User deleted successfully",
        })
    }catch(err){
        res.status(500).json({
            success: false,
            error: {
                msg: err.message
            }
        })
    }
}

module.exports = {
    signup,
    login,
    logout,
    getUser,
    deleteUser,
    updateUser
}