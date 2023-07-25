const {StatusCodes}=require('http-status-codes') 
const Company=require('../models/companymodel')
const customError=require('../errors/classerror')
const compress=require('../props/compress')
const {Job,deleteJob}=require('../models/jobmodel')
const { set } = require('mongoose')


//to create company
const createCompany=async(req,res)=>{
    try{
      console.log('inside the createcompany')
      if(req.file){
      const bufferdata=await compress(req.file.buffer)
      
        req.body.logo={
          "data":bufferdata,
          "contentType":req.file.mimetype
        }
      }
       const company=await Company.create(req.body)
       res.status(StatusCodes.CREATED).json(company)
    }
    catch(err){
        res.json(err)
    }
  }

const getAllCompany = async (req, res) => {
    try {
      let company = await Company.find({});
      console.log(company.length)
      company=company.map((c)=>{
        c=c.toObject()
        return c
      })
      console.log('hi')

      res.status(StatusCodes.OK).json(company);
    } catch (err) {
      res.json(err);
    }
  };
  


  module.exports={
    createCompany,
    getAllCompany
  }