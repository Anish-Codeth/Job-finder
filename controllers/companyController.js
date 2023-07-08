
const {StatusCodes}=require('http-status-codes') 
const Company=require('../models/company/companymodel')
const customError=require('../errors/errors')

const companyController=async (req,res)=>{
try{
const company=await Company.create(req.body)
res.status(StatusCodes.CREATED).json(company)
}
catch(err){
    return res.status(StatusCodes.NOT_ACCEPTABLE).json({"msg":err})
}





}

module.exports={
    companyController
}