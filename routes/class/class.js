const express = require('express')
const router  = express.Router()

const customerObj      = require('../../controllers/class/class-controller');
const decodeToken      = require('../../unity/univer');

//Subject Api

router.post('/add_class',customerObj.add_class);
router.post('/view_class',customerObj.view_class);
router.post('/getclassWithId',customerObj.getclassWithId);
router.post('/editclassdata', customerObj.editclassdata);
router.post('/deleteclass', customerObj.deleteclass);

module.exports = router;