const express = require('express')
const router  = express.Router()

const customerObj      = require('../../controllers/subject/subject-controller');
const decodeToken      = require('../../unity/univer');

//Subject Api

router.post('/add_subject',customerObj.add_subject);
router.post('/view_subject',customerObj.view_subject);
router.post('/getsubjectWithId',customerObj.getsubjectWithId);
router.post('/editsubjectdata', customerObj.editsubjectdata);
router.post('/deletesubject', customerObj.deletesubject);

module.exports = router;