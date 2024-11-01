const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    role:{
        type: String,
        enum: ['admin', 'moderator', 'user'],
        default: 'user'
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
}, {timestamps:true, versionKey: false});

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel;