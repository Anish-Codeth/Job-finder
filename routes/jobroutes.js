const express=require('express')
const router=express.Router()
const multer=require('multer')
const upload=multer()
const {getAllJobs,createJobs, jobQueries}=require('../controllers/jobController')
const auth=require('../middleware/auth')
 

router.route('/').get(auth,getAllJobs)
router.route('/create').post(createJobs)
router.route('/query?').get(auth,jobQueries)


module.exports=router;