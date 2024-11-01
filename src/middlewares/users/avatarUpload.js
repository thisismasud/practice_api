//this middleware will be used to upload the avatar of the user during signup
// here uploader function is imported from singleUpload.js file

const multer = require("multer");
const uploader = require("../../utilities/singleUpload")

//avatar upload middleware
function avatarUpload(req, res, next){
    const upload = uploader(
        "avatars", //destination where the image will be stored
        ["image/jpeg", "image/jpg", "image/png"], //allowed file types
        1000000, //max file size here it is 1MB
        "Only .jpg, .jpeg or .png format allowed!" //error message
    );

    //call the middleware, this is important to upload the file,
    // here upload.any() is used to accept any file from any field.
    //and upload.single('avatar') is used to accept only one file from only avatar field
    upload.single('avatar')(req, res, (err) =>{
        if(err){
            res.status(500).json({
                success: false,
                errors:{
                    avatar: {
                        msg: err.message
                    }
                }
            })
        }else{
            next()
        }
    })

}
module.exports = avatarUpload;