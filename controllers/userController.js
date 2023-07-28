const User=require('../models/usermodel')
const compress=require('../props/compress')
const {StatusCodes}=require('http-status-codes')
const customError=require('../errors/classerror')
const {decodeJWT}=require('../props/createJWT')

const profileController=async(req,res)=>{
  console.log('inside the signup');
  try{
    const token=req.headers.authorization.split(' ')[1];
    const {email}=decodeJWT(token);
    console.log(email)
    const user=await User.findOne({email})
    return res.status(StatusCodes.OK).json(user);
    }
    catch(err){
        throw new customError(StatusCodes.BAD_REQUEST,err)
    }
}

const updateprofileController=async(req,res)=>{
  console.log('inside the upadte dof the profile');
  try{
    const token=req.headers.authorization.split(' ')[1];
    const {email}=decodeJWT(token);
    console.log(email)
       if(req.files){
        for ( x in req.files)
        {
          let y=req.files[x][0]
            console.log(y)
          if(y.size>2048)
          throw new customError(StatusCodes.BAD_REQUEST,`${y.originalname} exceeded 2KB`)
          req.body[x]={
            data:y.buffer,
            contentType:y.mimetype
          }
        }

       }
       const user=await User.findOneAndUpdate({email},req.body,{new:true})
        res.status(StatusCodes.OK).json(user);
  }
  catch(err)
  {
    throw new customError(StatusCodes.BAD_REQUEST,err)
  }
}


module.exports={
    profileController,
    updateprofileController
}