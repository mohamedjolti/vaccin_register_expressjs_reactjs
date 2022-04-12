const { default: mongoose } = require("mongoose");

const VaccinSchema=mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    hospital:{
        type:String,
        required:true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
})

module.exports=new mongoose.model("Vaccin",VaccinSchema)