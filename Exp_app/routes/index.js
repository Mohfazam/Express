var express = require('express');
var router = express.Router();
const usermodel = require("./users");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
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
