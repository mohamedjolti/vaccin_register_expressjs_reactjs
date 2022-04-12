const { DB_NAME, DB_URL } = require("./config");

const mongoose=require("mongoose");

mongoose.connect(DB_URL+DB_NAME,{useNewUrlParser:true});

module.exports=mongoose;