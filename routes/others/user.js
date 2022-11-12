const express = require('express')
const router  = express.Router()


const customerObj = require('../../controllers/others/user-controller');

// Register User

router.post('/register', customerObj.registerUser);
router.post('/userlogin', customerObj.loginUser);
router.post('/frountuserlogin', customerObj.frountloginUser);
router.post('/editUserdata', customerObj.editUserdata);
router.post('/changepassword', customerObj.changepassword);
router.post('/forgetpass', customerObj.forgetPassword);
router.post('/resetpassword', customerObj.resetPassword);

module.exports = router;