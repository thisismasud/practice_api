/**
 * This is the todos controller file
 *
 */

const TodoModel = require("../models/TodoModel")
const UserModel = require("../models/UserModel")

//create todos
const createTodo = async (req, res) =>{

    try{
        const newTodo  = new TodoModel({
            ...req.body,
            user: req.user.userId
        })
        //save todos to database
        const result = await newTodo.save();

        //update current users' todos field
        await UserModel.updateOne({_id: req.user.userId}, {
            $push:{
                todos: result._id
            }
        })
        res.status(201).json({
            success: true,
            msg: "Todo created successfully",
            data: result
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

//get all todos
const getAllTodo = async(req, res) =>{
    try{
            // Gets all todos of current user at descending order of creation date
            const todos = await TodoModel.find(
                { user: req.user.userId },
                '_id title description todo_type'
            ).sort("-createdAt");

            res.status(200).json({
                success: true,
                data: todos
            });
    }catch(err){
        res.status(500).json({
            success: false,
            error: {
                msg: err.message
            }
        })
    }
}

//update todos
const updateTodo = async(req, res) =>{
    const todoId = req.params.id;
    try{
        const updatedTodo = await TodoModel.findOneAndUpdate({_id: todoId}, {
            ...req.body,
        })
        res.status(200).json({
            success: true,
            msg: "Todo updated successfully",
            data: updatedTodo
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            error: {
                msg: err.message
            }
        })
    }
}

//delete todos
const deleteTodo = async (req, res) =>{
    const todoId = req.params.id;
    try{
        //deletes corresponding-todo from the todo collection
        await TodoModel.deleteOne({_id: todoId})

        //deletes todoId from the user's todos array (important)
        await UserModel.updateOne({_id: req.user.userId}, {
            $pull: {
                todos: todoId
            }
        })
        res.status(200).json({
            success: true,
            msg: "Todo deleted successfully"
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
    createTodo,
    getAllTodo,
    updateTodo,
    deleteTodo
}