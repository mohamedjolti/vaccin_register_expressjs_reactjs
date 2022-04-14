const Vaccin = require("../models/Vaccin");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const { route } = require("./clientRoutes");

const router = require("express").Router();

router.get("/", (req, res) => {
    Vaccin.find({}, (err, vaccins) => {
        if (err) res.send({ status: "error", message: err })
        else res.send({status:true,data:vaccins});
    })
})

router.post("/", (req, res) => {
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

router.put("/",(req,res)=>{
        //getting client
        const token = req.header('token');
        const clientId = jwt.verify(token, "tokensecret");
        let { date, hospital ,_id} = req.body;
        //creating new vaccin
        Vaccin.findByIdAndUpdate({_id} ,{ date, hospital, client: clientId }, 
            (err, updatedVaccin) => {
            if (err) res.send({ status: false, message: err })
            else
                res.send({ status: true, data: updatedVaccin })
        })
})

module.exports = router