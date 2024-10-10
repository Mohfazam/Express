var express = require('express');
var router = express.Router();
const usermodel = require("./users");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
});

router.get('/create', async function(req, res, next) {
  let x = await usermodel.create({
    username: "mohfazam",
    name: "sarwar",
    age: 20

  });
  res.send(x);
});

router.get("/allusers", async function(req, res){
 let allusers = await usermodel.find();

 res.send(allusers);
});

module.exports = router;
