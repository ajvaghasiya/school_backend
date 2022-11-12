const express = require('express'); 
const multer = require('multer');
const router  = express.Router()
upload        = multer({ dest: '../views' });

const customerObj      = require('../../controllers/exam/exam-controller');
const decodeToken      = require('../../unity/univer');

//Exam Api

router.post('/add_exam',customerObj.add_exam);
router.post('/view_exam',customerObj.view_exam);
router.post('/getexamWithId',customerObj.getexamWithId);
router.post('/editexamdata', customerObj.editexamdata);
router.post('/uploadresultdata',upload.single('file'),customerObj.uploadresultdata);
router.post('/delete_exam', customerObj.delete_exam);

module.exports = router;