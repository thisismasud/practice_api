//this file is responsible for single file upload mechanism

//dependencies
const multer = require("multer");
const path = require("path");

function uploader(destination, allowed_file_types, max_file_size, error_msg) {
    const UPLOAD_FOLDER = `${__dirname}/../../public/uploads/${destination}`;

    //define the storage
    const storage = multer.diskStorage({
        //define the destination
        destination: (req, file, cb) =>{
            cb(null, UPLOAD_FOLDER)
        },
        //define filename this function make sure that the file name is unique with a timestamp
        filename: (req, file, cb) =>{
                    const fileExt = path.extname(file.originalname);
                    const filename = file.originalname
                        .replace(fileExt, "")
                        .toLowerCase()
                        .split(" ")
                        .join("-") + "-" + Date.now();

                    //join the filename and extension
                    console.log(filename+fileExt)
                    cb(null, filename + fileExt)
        }
    })

    //prepare the final multer upload object
    const upload = multer({
        storage: storage,

        //limits the file size
        limits: {
            fileSize: max_file_size
        },
        //file filter checks if the file type is allowed or not
        fileFilter: (req, file, cb) =>{
            if(allowed_file_types.includes(file.mimetype)){
                cb(null, true)
            }else{
                cb(new Error(error_msg))
            }
        }
    })
    return upload
}
module.exports = uploader;