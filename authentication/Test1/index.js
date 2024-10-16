const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomstringliteral";
const app = express();
app.use(express.json());

const users = [];

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    });


    res.json({
        msg: "Your signed up(:"
    });

    console.log(users);
});



app.post("/signin", function (req, res) {

    let founduser = null;

    const username = req.body.username;
    const password = req.body.password;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            founduser = users[i];
        }
    }

    if (founduser) {
        const token = jwt.sign({ username: username }, JWT_SECRET);

        // founduser.token = token;

        res.json({
            token: token
        });
    }
    else {
        res.status(403).send({
            msg: "Invalid username or password"
        });
    }

    console.log(users);

});


app.get("/me", function (req, res) {
    const token = req.headers.token;
    const decodedinfo = jwt.verify(token, JWT_SECRET);
    const username = decodedinfo.username

    const user = users.find(user => user.username === token);

    if (user) {
        res.send({
            username: user.username,
            password: user.password
        });
    }
    else {
        res.status(401).send({
            msg: "Unauthorized"
        });
    }
});


app.listen(3000);