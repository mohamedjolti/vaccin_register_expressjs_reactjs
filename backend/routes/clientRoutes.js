const clientModel = require("../models/Client");
const { hashString, compareTwoHashedStrings } = require("../services/stringService");
const router = require("express").Router();
const jwt = require("jsonwebtoken")
const verifyToken=require("./virifyToken");

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    let checkClient = await clientModel.findOne({ email: email })
    if (checkClient) {
        res.send("user with the email :" + email + "alredy exist ")
    }

    let passwordHashed = await hashString(password);
    let newClientToSave = { name, email, password: passwordHashed };

    clientModel.create(newClientToSave, (err, newClient) => {
        if (err) console.log(err);
        res.send(newClient);
    })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const checkUser = await clientModel.findOne({ email: email });
    if (!checkUser) {
        res.send({ status: false, message: "No user found with this email" });
    }

    let checkPassword = await compareTwoHashedStrings(password, checkUser.password);

    if (checkPassword) {
        const token = jwt.sign({ _id: checkUser._id }, "tokensecret")
        res.send({ status: true, token: token });
    } else {
        res.send({ status: false, message: "password not correct" });
    }

})

router.get("/",verifyToken, (req, res) => {
    clientModel.find({}, (err, clients) => {
        if (err) console.log(err)
        console.log(clients);
        res.send(clients);
    })
})

module.exports = router;