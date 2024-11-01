const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    todo_type:{
        type: String,
        enum: ['urgent', 'normal']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true, versionKey: false})

const TodoModel = mongoose.model('Todo', todoSchema);

module.exports = TodoModel;