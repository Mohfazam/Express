const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test");

const userschema = mongoose.Schema({
  username: String,
  name: String,
  age: Number
});

module.exports = mongoose.model("user", userschema);