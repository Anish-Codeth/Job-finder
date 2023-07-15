const express=require('express')
const router=express.Router()
const multer=require('multer')
const upload=multer()
const {getAllJobs,createJobs, jobQueries}=require('../controllers/jobController')
 
// router.route('/details').post(upload.single('logo'),companyController)
// router.route('/details/:companyName').get(getCompanies)
// router.route('/jobs').get(getjobs)

router.route('/').get(getAllJobs)
router.route('/create').post(createJobs)
router.route('/query?').get(jobQueries)


module.exports=router;