const express=require('express')
const router=express.Router()
const multer=require('multer')
const upload=multer()
const {createCompany,getAllCompany}=require('../controllers/companyController')


router.route('/').get(getAllCompany)
router.route('/create').post(upload.single('logo'),createCompany)


module.exports=router;