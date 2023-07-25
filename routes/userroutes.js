const express=require('express')
const router=express.Router()
const multer=require('multer')
const upload=multer()
const { signUpController }=require('../controllers/userController')
 
router.route('/signup').post(upload.single('profilePicture'),signUpController);

module.exports=router;