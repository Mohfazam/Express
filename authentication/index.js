const express = require("express");
const app = express();
app.use(express.json());

const users = [];

app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    });


    res.json({
        msg: "Your signed in(:"
    });
});

app.post("/signin", function(req, res){

});


app.listen(3000);