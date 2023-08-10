const express=require('express')
const router=express.Router()
const {registerController,emailverifyController, loginController, updatePasswordController, requestresetpasswordController, resetpasswordController}=require('../controllers/registerCOntroller')
const authMiddleware=require('../middleware/auth')
const path=require('path')

router.route('/signup').post(registerController)
router.route('/verification').post(emailverifyController)
router.route('/login').post(loginController)
router.route('/updatepassword').patch(authMiddleware,updatePasswordController)
router.route('/forgot').post(requestresetpasswordController)

router.route('/forgot?').patch(resetpasswordController).get((req,res)=>{
    return res.sendFile(path.resolve(__dirname,'../static/testing.html'))   
}
)

module.exports=router