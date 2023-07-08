const mongoose=require('mongoose')

const companyJobsSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'please provide the job name']
    }
})


module.exports=companyJobsSchema