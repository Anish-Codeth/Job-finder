// const mongoose=require('mongoose')
// const date = require('date-and-time')

// // const companyDetailSchema=require('./companydetailmodel')


// const companySchema=new mongoose.Schema({
// details:{
//     name:{
//         type:String,
//         required:[true,'please provide the name of the company'],
//         set:(value)=>{
//             return value.toUpperCase()
//         },
//         unique:true
//     },}
// //     logo:{
// //         data:Buffer,
// //         contentType:String,
// //         default:{}
// //     },
// //     location:{
// //         longitude:Number,
// //         latitude:Number
// //     },
// //     description:String,
// //     contactDetail:{
// //         email:String,
// //         phoneNumber:{
// //             type:String,
// //             validate:{
// //                 validator:function(e){
// //                     const pattern=/^\d{10}$/
// //                     return pattern.test(e)
// //                 },
// //                 message:'invalid phonenumber'
// //         },
// //         website:String
// //     }}
// // }
// ,

// jobs:[
//     {
//         salary:{
//             start:Number,
//             end:Number,
//             currency:String
//         },
//         location:String,
//         skills:[String],
//         educationLevel:String,
//         interviewDate:{
//             openAt:{
//                 type:String,
//                 set:(v)=>date.format(v,'YYYY-MM-DD HH:MM:SS')
//             },
//             closedAt:{
//                 type:String,
//                 set:(v)=>date.format(v,'YYYY-MM-DD HH:MM:SS')
//             }
//         },
//         about:String,
//         category:String,
//         jobTime:String
//     }
// ]

// }
// )




// module.exports=mongoose.model('COMPANY',companySchema)

