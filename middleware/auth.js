const customError=require('../errors/classerror')
const {decodeJWT}=require('../props/createJWT')
const User=require('../models/usermodel')
const { StatusCodes } = require('http-status-codes')


const auth=async(req,res,next)=>{
    if(!req.headers.authorization.includes(' ')){
        throw new customError(StatusCodes.BAD_REQUEST,"Provide code and token") 
    }

    const token=req.headers.authorization.split(' ')[1]

    const {email}=decodeJWT(token)
    console.log(email)
    try{
    const user=await User.find({email})
    if(user.length==1)
    {
        console.log('auth passed');
        next()
    }
    else{
        return res.status(StatusCodes.BAD_REQUEST).json('not accessed')
    }
}
    catch(err){
        throw new customError(StatusCodes.BAD_REQUEST,'error ')
    }
}

module.exports=auth