const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Helloworld";

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
        msg: "Your signed up"
    })
});

app.post("/signin", function(req, res){
    let founduser = null;

    const username = req.body.username;
    const password = req.body.password;

    founduser = users.find(u => u.username === username && u.password === password);

    if(founduser){
        const token = jwt.sign({ username: username }, JWT_SECRET);

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

function auth(req, res, next){
    const token = req.headers.token;
    const decodedinfo = jwt.verify(token, JWT_SECRET); 

    req.username = decodedinfo.username;
    if(decodedinfo.username){
        next();
    }
    else{
        res.json({
            msg: "Invalid credentials"
        });
    }
}


app.get("/me", auth, function(req, res){
    

    const user = users.find(u => u.username === req.username);

    if(user){
        res.json({
            username: user.username,
            password: user.password
        });
    }
    else{
        res.status(401).json({
            msg: "Unauthorized"
        })
    }
});


app.listen(3000);