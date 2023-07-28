const express=require('express')
const router=express.Router()
const multer=require('multer')
const upload=multer()
const { profileController,updateprofileController }=require('../controllers/userController')
const auth=require('../middleware/auth')
 
router.route('/profile').get(auth,profileController).patch(upload.fields([{name:'photo'},{name:'cv'}
,{name:'coverLetter'}]),auth,updateprofileController);

module.exports=router;