const User=require('../models/usermodel')
const compress=require('../props/compress')
const {StatusCodes}=require('http-status-codes')

const signUpController=async(req,res)=>{
    console.log('inside the signup');
    try{
        if(req.file){
        const bufferdata=await compress(req.file.buffer)
          req.body.profilePicture={
            "data":bufferdata,
            "contentType":req.file.mimetype
          }
        }
         const user=await User.create(req.body)
         res.status(StatusCodes.CREATED).json(user)
      }
      catch(err){
          res.json({err})
      }
}


module.exports={
    signUpController
}