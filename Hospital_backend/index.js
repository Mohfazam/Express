const express = require("express");
const app = express();
app.use(express.json());

const users = [{
    name: "john",
    kidneys : [{
        healthy: false,
    }]
}]



app.get("/", function(req, res){
    const johnkidneys = users[0].kidneys;
    let totalkidneys = johnkidneys.length;
    let healthykidneys = 0;
    for(let i =0; i < johnkidneys.length; i++){
        if(johnkidneys[i].healthy){
            healthykidneys++;
        }
    }
    let unhealthykidneys = totalkidneys - healthykidneys;

    res.json({
        // johnkidneys,
        totalkidneys,
        healthykidneys,
        unhealthykidneys
    });
});


app.post("/", function(req, res){

    const ishealthy = req.body.ishealthy;
    users[0].kidneys.push({
        healthy: ishealthy
    });

    res.json({
        msg: "Done"
    })

}); 


app.put("/", function(req, res){

    if(!atleastoneunhealthykidney()){
        res.status(411);
        res.json({msg: "No unhealthy kidney"})
    }

    for(let i = 0; i< users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }

    res.json({});
});

app.delete("/", function(req, res){
    if(!atleastoneunhealthykidney()){
        res.status(411);

        res.json({msg: "your fine and shine"})
    }

    let newkidneys = [];
    for(let i = 0; i < users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy){
            newkidneys.push({
                healthy: true
        });
        }
    }

    users[0].kidneys = newkidneys;
    res.json({
        msg: "Kidenys replaced"
    });
});



function atleastoneunhealthykidney(){
    let leastunhelathykidney = false;

    for(let i = 0; i < users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
        leastunhelathykidney = true;
        }
    }

    return leastunhelathykidney;
}

app.listen(3000);