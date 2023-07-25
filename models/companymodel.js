const mongoose=require('mongoose')
const date = require('date-and-time')



const companySchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:[true,'please provide the name of the company'],
        unique:[true,'already registered company']
    },
    logo:{
        data:Buffer,
        contentType:String,
        default:{}
    },
    // location:{
    //     longitude:Number,
    //     latitude:Number
    // },
    description:String,
    contactDetail:{
        emailId:String,
        phoneNumber:{
            type:String,
            validate:{
                validator:function(e){
                    // const pattern=/^\d{10}$/
                    // return pattern.test(e)
                    return !isNaN(Number(e))
                },
                message:'invalid phonenumber'
        }
    },
        websiteLink:String
    }
}
)

module.exports=mongoose.model('COMPANY',companySchema)


  


//   module.exports={
//     createCompany,
//     getAllCompany
//   }