const mongoose = require("../mongooseConfig");

const clientSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:5
    },
    email:{
        type:String,
        required:true,
        min:4
    },
    password:{
        type:String,
        required:true,
        min:4
    }
})

module.exports=new mongoose.model("Client",clientSchema); 