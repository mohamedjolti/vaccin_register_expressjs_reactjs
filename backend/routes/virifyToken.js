const jwt=require("jsonwebtoken")

module.exports=function (req,res,next){
    const token=req.header('auth-token');
    if(!token)  return res.status("404").send("Access dined")

    try{
       const virified=jwt.verify(token,"tokensecret");
       req.user=virified
       next()
    }catch(err){
      res.status("404").send("token dined") 

    }
}