const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Helloworld";

const app = express();
app.use(express.json());

const users = [];

app.get("/", function(req, res){
    res.sendFile(__dirname + "/Public/index.html");
});

app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    });

    res.json({
        msg: "Your signed up"
    })

});

app.post("/signin", function(req, res){
    let founduser = null;

    const username = req.body.username;
    const password = req.body.password;

    founduser = users.find(u => u.username === username && u.password === password);

    if(founduser){
        const token = jwt.sign({ username: founduser.username }, JWT_SECRET);

        res.json({
            msg:"Your Logged in", 
            token: token
        })
    }
    else{
        res.status(403).json({
            msg: "Invalid Username or password"
        })
    }
});



function auth(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

app.get("/me", auth, (req, res) => {
    const user = req.user;

    res.send({
        username: user.username
    })
})

app.listen(3000);