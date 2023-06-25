const express=require('express')
const router=express.Router()
const {registerController}=require('../controllers/register')

router.route('/register').post(registerController)
module.exports=router;