const express=require('express')
const router=express.Router()
const {companyController}=require('../controllers/companyController')

router.route('/details').post(companyController)
module.exports=router;