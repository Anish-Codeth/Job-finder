const mongoose=require('mongoose')

// const companyDetailSchema=require('./companydetailmodel')
const companyJobSchema=require('./companyjobmodel')

const companyDetailSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'please provide the company name'],
    }
})

const companyJobsSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'please provide the job name'],
    }
})


const companySchema=new mongoose.Schema({
companyDetail:{
    type:companyDetailSchema,
    unique:true
    },
Jobs:[companyJobSchema]//you have to create uniqueness of the job
})
// companySchema.index({ 'companyDetail.Name': 1 }, { unique: true });



module.exports=mongoose.model('COMPANY',companySchema)

