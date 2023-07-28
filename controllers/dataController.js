const {StatusCodes}=require('http-status-codes') 
const Data=require('../models/datamodel')
const customError=require('../errors/classerror')

const getDataController=async(req,res)=>{
const query=req.query 
try{
const data=await Data.find({query})
res.status(StatusCodes.OK).json(data)
}
catch(err)
{
throw new customError(StatusCodes.BAD_REQUEST,err)
}
}


module.exports={
    getDataController
}