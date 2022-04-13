const Vaccin = require("../models/Vaccin");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");

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

module.exports = router