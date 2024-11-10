const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = async(req,res,next)=>{
    const token = req.cookies.token || req.header("Authorization").replace("Bearer ","")
    if(!token){
        return res.status(401).json({
            success:false,
            message:"token missing"
        })
    }

    if(!jwt.verify(token,process.env.JWT_SECRET)){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
    else{
        next()
    }
}