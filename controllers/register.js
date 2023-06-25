const registerSchema=require('../models/registermodels')
const httpstatuscode=require('http-status-codes') 
const User=require('../models/registermodels')

const registerController=async (req,res)=>{
console.log("Inside registerController")
const user=await User.create(req.body)
res.json({user})
}

module.exports={
    registerController
}