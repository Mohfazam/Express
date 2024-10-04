const express = require("express");

const app = express();

app.get("/ride1", function(req, res){
    if(oldenough(req.query.age)){
        res.json({
            msg: "You successfuly riden the ride 1:"
        });
    }
    else{
        res.status(411).json({
            msg: "Sorry yur underage"
        });
    }
    
});




app.get("/ride2", function(req, res){
    if(oldenough(req.query.age)){
        res.json({
            msg: "You successfuly riden the ride 2:"
        });
    }
    else{
        res.status(411).json({
            msg: "Sorry yur underage"
        });
    }
    
});




function oldenough(age){
    if(age >= 14){
        return true;
    }
    else{
        return false;
    }
}


app.listen(3000);