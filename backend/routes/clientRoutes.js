const clientModel = require("../models/Client");
const { hashString, compareTwoHashedStrings } = require("../services/stringService");

const router = require("express").Router();

router.post("/register",async (req, res) => {
    const { name, email, password } = req.body;

    let checkClient = await clientModel.findOne({ email: email })
    if (checkClient) {
        res.send("user with the email :" + email + "alredy exist ")
    }

    let passwordHashed =await hashString(password);
    let newClientToSave = { name, email,password: passwordHashed };

    clientModel.create(newClientToSave, (err, newClient) => {
        if (err) console.log(err);
        res.send(newClient);
    })
})

router.post("/login",async (req,res)=>{
    const {email,password}=req.body; 
    const checkUser=await clientModel.findOne({email:email});
    if(!checkUser){
        res.send("No user found with this email");
    }

    let checkPassword=await compareTwoHashedStrings(password,checkUser.password);

    if(checkPassword){
        res.send({status:true})
    }else{
        res.send({status:false});
    }

})

router.get("/", (req, res) => {
    clientModel.find({}, (err, clients) => {
        if (err) console.log(err)
        console.log(clients);
        res.send(clients);
    })
})

module.exports = router;