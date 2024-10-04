const express = require("express");

const app = express();

app.get("/ride1",oldenough, function (req, res) {

    res.json({
        msg: "You successfuly riden the ride 1:"
    });


});




app.get("/ride2", oldenough, function (req, res) {

    res.json({
        msg: "You successfuly riden the ride 2:"
    });



});



//self created middleware
// function oldenough(age){
//     if(age >= 14){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

//middleware
function oldenough(req, res, next) {
    const age = req.query.age;
    if (age >= 14) {
        next();
    }
    else {
        res.json({
            msg: "Sorry your underage for this ride"
        });
    }
}

app.listen(3000);