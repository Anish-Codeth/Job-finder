const mongoose=require('mongoose')

// const companyDetailSchema=require('./companydetailmodel')
const companyJobSchema=require('./companyjobmodel')

const companyDetailSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'please provide the company name'],
        unique:true
    }
})

const companySchema=new mongoose.Schema({
companyDetail:companyDetailSchema,
Jobs:[companyJobSchema]
})

module.exports=mongoose.model('COMPANY',companySchema)

