const {createJWT,decodeJWT}=require('../props/createJWT')//to create and decode json web token
const customError=require('../errors/classerror')
const {StatusCodes}=require('http-status-codes')
const User=require('../models/usermodel.js')
const Token=require('../models/Tokenmodel')
const sendmail=require('../props/nodemailer')
const createcode=require('../props/createcode')
const jwt=require('jsonwebtoken')
const {decodePassword,encodePassword}=require('../props/encodedecodePassword')//to verify the bcrypt password
const templateforreset=require('../template/reset.js')
const crypto=require('crypto')
require('dotenv').config()


const registerController=async (req,res)=>{
//this is how user must send me data
const {email,password}=req.body
if(!email || !password)
{
throw new customError(StatusCodes.BAD_REQUEST,"Provide email and Password")
}

const token=createJWT({email,password},{expiresIn:'30d'})
const code=createcode(token)
//errorc
//this is the format i send to user on hitting submit in register page
await sendmail(email,code).catch((err)=>{throw new customError(StatusCodes.BAD_REQUEST,err)})

return res.status(StatusCodes.OK).json({token,"msg":"Email has been sent",code})//remove code later
}

const emailverifyController=async(req,res)=>{
    //this is how user send data after hitting submit in verification page number must send in string
    if(!req.body.code || !req.headers.authorization || !req.headers.authorization.includes(' ')){
        throw new customError(StatusCodes.BAD_REQUEST,"Provide code and token") 
    }

    const token=req.headers.authorization.split(' ')[1]
    const {code}=req.body
    const decodecode=createcode(token)
    console.log(decodecode)
    if(Number(decodecode)==code){
        //creation of the user
 
        const {email,password}=decodeJWT(token)
        await User.create({email,password})
        return res.status(StatusCodes.CREATED).json({"verified":true})
    }
    else{
        return res.status(StatusCodes.CREATED).json({'verified':false})
    }
}


const loginController=async(req,res)=>{
    //write code for login
    let {email,password}=req.body
if(!email || !password)
{
throw new customError(StatusCodes.BAD_REQUEST,"Provide email and Password")

}
try{
    
    const user=await User.find({email})
    if(user.length!=0 ){
        if(await decodePassword(password,user[0].password)){
            const token=createJWT({email,password},{expiresIn:'15d'})
        res.status(StatusCodes.OK).json({token,"status":"found"})
        }
        else{
            res.status(StatusCodes.NOT_FOUND).json({"status":"not found"})
        }
    }
    else{
        res.status(StatusCodes.NOT_FOUND).json({"status":"not found"})
    }
}
catch(err){
    throw new customError(StatusCodes.BAD_REQUEST,'error came')
}

}


const updatePasswordController=async(req,res)=>{
const  token=req.headers.authorization.split(' ')[1]
const {email,password}=decodeJWT(token)
if(!req.body.oldPassword || !req.body.newPassword){
    throw new customError(StatusCodes.BAD_REQUEST,'please provide passwords')
}
let {oldPassword,newPassword}=req.body
try{
// const user=await User.findOne({email})
// const ismatch=await decodePassword(oldPassword,user.password)
console.log(password,oldPassword);
if(password===oldPassword){
    newPassword=await encodePassword(newPassword)
    await User.findOneAndUpdate({email},{password:newPassword})
    res.status(StatusCodes.OK).json({"msg":`Password is updated ${oldPassword}---->${newPassword}`})
}
}
catch(err){
    throw new customError(StatusCodes.BAD_REQUEST,err)
}
//after updating password user must login again
}


//for the forgetting of password
const requestresetpasswordController=async(req,res)=>{
    const {email}=req.body;
    
    const user=await User.findOne({email})

    
    if(user){
        let token = await Token.findOne({ userId: user._id });
        if (token) await token.deleteOne();

        let resetToken = crypto.randomBytes(32).toString("hex");
        const hash = await encodePassword(resetToken);

  

        await Token.create({
        userId:user._id,
        token:hash  //here u must save resettoken
    })
        const link=`${process.env.CLIENT_URL}/forgot?hash=${hash}&id=${user._id}`

        const template=await templateforreset(link)
        await sendmail(email,template).catch((err)=>{throw new customError(StatusCodes.BAD_REQUEST,err)})
        res.status(StatusCodes.OK).json({"link":link})
    }
    else{
        res.json("Email is never registered")
    }
}




//for the updating of the reseting password
const resetpasswordController=async(req,res)=>{
    console.log('hi')
    console.log(req.query)
    if(!req.query.hash||!req.query.id||!req.body.newPassword)
    throw new customError(StatusCodes.BAD_REQUEST,'Error not come')
    const {hash,id}=req.query
    let {newPassword}=req.body

    const resettoken=await Token.findOne({"userId":id,"token":hash});

    console.log(resettoken)
    if(!resettoken){
        throw new Error("Invalid id or code")
    }
    newPassword=await encodePassword(newPassword)
    await User.findByIdAndUpdate({"_id":id},{"password":newPassword})
    const {email}=await User.findOne({"_id":id})
    console.log(email)
    await sendmail(email,'Password reset success!').catch((err)=>{throw new customError(StatusCodes.BAD_REQUEST,err)})
    await Token.deleteOne({"userId":id})
    res.status(StatusCodes.OK).json({newPassword})
    

    
    // let {hash:_id}=req.forgot
    // const {password}=req.body
    // if(!_id || !password){
    //     throw new customError(StatusCodes.BAD_REQUEST,"not validated url")
    // }
    // const user=await User.findById({"_id":_id})
    // if(user){
    //       await User.findByIdAndUpdate({"_id":_id},{password})
    //       res.status(StatusCodes.OK).json({"msg":"Created"})
    // }
    // else{
    //     throw new customError(StatusCodes.BAD_REQUEST,"Given user is not registered")
    // }
}

module.exports={
    registerController,
    emailverifyController,
    loginController,updatePasswordController,
    requestresetpasswordController,
    resetpasswordController
}