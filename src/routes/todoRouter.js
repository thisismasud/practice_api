const express = require("express");
const router = express.Router();
const checkLogin = require("../middlewares/common/checkLogin")

const {createTodo, getAllTodo, updateTodo, deleteTodo} = require("../controllers/todoController")

router.post("/createtodo", checkLogin, createTodo)
router.get("/getalltodo", checkLogin, getAllTodo)
router.post("/updatetodo/:id", checkLogin, updateTodo)
router.delete("/deletetodo/:id", checkLogin, deleteTodo)

module.exports = router