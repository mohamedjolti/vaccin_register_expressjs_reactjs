const Vaccin = require("../models/Vaccin");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const { route } = require("./clientRoutes");
const virifyToken = require("./virifyToken");

const router = require("express").Router();

router.get("/",virifyToken, (req, res) => {
    Vaccin.find({}, (err, vaccins) => {
        if (err) res.send({ status: "error", message: err })
        else res.send({status:true,data:vaccins});
    })
})

router.post("/",virifyToken, (req, res) => {
    //getting client
    const token = req.header('token');
    const clientId = jwt.verify(token, "tokensecret");
    let { date, hospital } = req.body;
    //creating new vaccin
    Vaccin.create({ date, hospital, client: clientId }, (err, newVaccin) => {
        if (err) res.send({ status: false, message: err })
        else
            res.send({ status: true, data: newVaccin })
    })
})

router.put("/",virifyToken,(req,res)=>{

        let { date, hospital ,_id} = req.body;
        //updating vaccin
        Vaccin.findByIdAndUpdate({_id} ,{ date, hospital }, 
            (err, updatedVaccin) => {
            if (err) res.send({ status: false, message: err })
            else
                res.send({ status: true, data: updatedVaccin })
        })
})

router.delete("/",virifyToken,(req,res)=>{
       
        //creating new vaccin
        Vaccin.findByIdAndDelete({_id:req.body._id}, 
            (err, deletedVaccin) => {
            if (err) res.send({ status: false, message: err })
            else
                res.send({ status: true, data: deletedVaccin })
        })
})

module.exports = router