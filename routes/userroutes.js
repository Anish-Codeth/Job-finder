const express=require('express')
const router=express.Router()
const multer=require('multer')
const upload=multer()
const { profileController,updateprofileController }=require('../controllers/userController')
 
router.route('/profile').get(profileController).patch(upload.fields([{name:'photo'},{name:'cv'}
,{name:'coverLetter'}]),updateprofileController);

module.exports=router;