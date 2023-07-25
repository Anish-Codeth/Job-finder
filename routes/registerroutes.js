const express=require('express')
const router=express.Router()
const {registerController,emailverifyController, loginController, updatePasswordController, requestresetpasswordController, resetpasswordController}=require('../controllers/registerCOntroller')
const authMiddleware=require('../middleware/auth')

router.route('/signup').post(registerController)
router.route('/verification').post(emailverifyController)
router.route('/login').post(loginController)
router.route('/updatepassword').patch(authMiddleware,updatePasswordController)
router.route('/forgot').post(requestresetpasswordController)
router.route('/forgot?').patch(resetpasswordController)
module.exports=router