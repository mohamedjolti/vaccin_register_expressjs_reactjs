const Vaccin = require("../models/Vaccin");

const router=require("express").Router();

router.get("/",(req,res)=>{
    Vaccin.find({},(err,vaccins)=>{
        if(err) res.send({stauts:"error",message:err})
        else res.send(vaccins);
    })
})

module.exports=router