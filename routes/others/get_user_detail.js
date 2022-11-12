const express = require('express')
const router  = express.Router()

const customerObj      = require('../../controllers/others/user-controller');
const decodeToken      = require('../../unity/univer');

//Get User

router.post('/get_user_detail',customerObj.get_user_detail);
router.post('/getuserWithid',customerObj.getuserWithid);
router.post('/get_user_profile',customerObj.getuserprofile);
router.post('/deletelistuser',customerObj.deletelistuser);

module.exports = router;