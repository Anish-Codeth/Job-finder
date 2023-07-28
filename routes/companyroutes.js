const express=require('express')
const router=express.Router()
const multer=require('multer')
const upload=multer()
const {createCompany,getAllCompany}=require('../controllers/companyController')



router.route('/').get(getAllCompany)
router.route('/create').post(upload.single('logo'),createCompany)


module.exports=router;
// company_job.filter(e=>{
//     if(e.jobTime=='remote')
//     length.remote+=1;
//     else if(e.jobTime=='fulltime')
//     length.fulltime+=1
//     else
//     length.parttime+=1
//    })

// const length={
//     remote:0,
//     fulltime:0,
//     parttime:0
//    }