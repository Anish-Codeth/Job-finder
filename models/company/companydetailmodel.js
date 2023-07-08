const mongoose=require('mongoose')

const companyDetailSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'please provide the name'],
        unique:true
    }
})

module.exports=companyDetailSchema