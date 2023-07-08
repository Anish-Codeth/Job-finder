const mongoose=require('mongoose')

const companyDetailSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'please provide the name']
    }
})

module.exports=companyDetailSchema