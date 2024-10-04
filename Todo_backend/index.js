const express = require("express");

const app = express();

let todo = [];

app.get("/", function(req, res){
    res.send("hello ma nigga");
});

app.listen(3000);const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const router = Router();

// todo Routes
router.post('/', (req, res) => {
    // Implement todo creation logic
    
});

router.put('/', adminMiddleware, (req, res) => {
    // Implement update todo  logic
});

router.delete('/', adminMiddleware, (req, res) => {
    // Implement delete todo logic
});

router.delete('/:id', adminMiddleware, (req, res) => {
    // Implement delete todo by id logic
});


router.get('/', adminMiddleware, (req, res) => {
    // Implement fetching all todo logic
});

router.get('/:id', adminMiddleware, (req, res) => {
    // Implement fetching todo by id logic
});

module.exports = router;