const express = require("express");

const app = express();

app.use(express.json());

let todo = [
    {
        id: 0,
        task: "str"
    }
];


// app.listen(3000);const { Router } = require("express");
// const adminMiddleware = require("../middleware/user");
// const router = Router();

// todo Routes
app.post('/', (req, res) => {
    // Implement todo creation logic
    let newtask = req.body.newtask;
    const newtodo = {
        id: todo.length,
        task: newtask
    }

    todo.push(newtodo);
    res.status(200).json({
        msg:"Task added successfully",
        todo: newtodo
    });

});

app.put('/', (req, res) => {
    // Implement update todo  logic
    const id = parseInt(req.params.id);
    const updatetask = req.body.task;

    let taskfound = false;
    for(let i = 0; i < todo.length; i++){
        if(todo[i].id = id){
            todo[i].task = updatetask;
            taskfound = true;

            res.status(200).json({
                msg: "task updated successfully",
                todo: todo[i]
            });
            break;
        }
    }

    if(!taskfound){
        res.status(404).json({
            msg: "task not found"
        })
    }

});

app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Using a simple for loop to find the index of the task to delete
    let taskFound = false;
    for (let i = 0; i < todo.length; i++) {
        if (todo[i].id === id) {
            const deletedTask = todo.splice(i, 1); // Remove task from the array
            taskFound = true;
            res.json({
                msg: "Task deleted successfully",
                todo: deletedTask
            });
            break;
        }
    }
    
    if (!taskFound) {
        res.status(404).json({ msg: "Task not found" });
    }
});

// Route to fetch all todo items
app.get('/', (req, res) => {
    res.json({ todo });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});