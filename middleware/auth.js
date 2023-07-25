const customError=require('./errorMiddleware')
const {decodeJWT}=require('../props/createJWT')
const User=require('../models/usermodel')
const { StatusCodes } = require('http-status-codes')


const auth=async(req,res,next)=>{
    if(!req.headers.authorization.includes(' ')){
        throw new customError(StatusCodes.BAD_REQUEST,"Provide code and token") 
    }

    const token=req.headers.authorization.split(' ')[1]
    console.log(token)

    const {email}=decodeJWT(token)
    console.log(email)
    try{
    const user=await User.findOne({email})
    if(user)
    {
        next()
        console.log('auth passed');
    }
    else{
      throw new customError(StatusCodes.BAD_REQUEST,'You are not accesed')
    }}
    catch(err){
        return res.json(err)
    }
}

module.exports=auth