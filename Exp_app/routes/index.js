var express = require('express');
var router = express.Router();
const usermodel = require("./users");

/* GET home page. */
router.get('/ban', function(req, res) {
  req.session.ban = true;
  res.render("index");
});



router.get("/cookie", function(req, res){
  res.cookie("age", 18);
  res.cookie("username", "mohfazam");
  res.render("index");
});

router.get("/cookiedetails", function(req, res){
  res.write(`The age of the user is ${req.cookies.age}`);
  res.write(`The age of the user is ${req.cookies.username}`);
});

router.get("/checkban", function(req, res){
  if(req.session.ban === true){
    res.send("Your banned");
  }
  else{
    res.send("Your not banned till now (:");
  }
});

router.get("/deleteban", function(req, res){
    req.session.destroy(function(err){
      console.log(err);
      res.send("ban removed");
    });
});

router.get('/create1', async function(req, res, next) {
  let x = await usermodel.create({
    username: "mohfazam",
    name: "sarwar",
    age: 20

  });
  res.send(x);
});

router.get('/create2', async function(req, res, next) {
  let x = await usermodel.create({
    username: "John",
    name: "John doe",
    age: 40

  });
  res.send(x);
});

router.get("/allusers", async function(req, res){
 let allusers = await usermodel.find();

 res.send(allusers);
});

router.get("/delete1", async function(req, res){
  let deleteduser = await usermodel.findOneAndDelete({age: 40});
  res.send(deleteduser);
});

router.get("/delete2", async function(req, res){
  let deleteduser = await usermodel.findOneAndDelete({age: 20});
  res.send(deleteduser);
});


module.exports = router;
