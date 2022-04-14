const jwt=require("jsonwebtoken")

module.exports=function (req,res,next){
    const token=req.header('token');
    if(!token)  return res.status("404").send({status:false,message:"the token is missing"}) 

    try{
       const virified=jwt.verify(token,"tokensecret");
       req.user=virified
       next()
       
    }catch(err){
      res.status("404").send({status:false,message:"token dined"}) 

    }
}