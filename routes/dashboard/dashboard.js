const express = require('express')
const router  = express.Router()

const customerObj      = require('../../controllers/dashboard/dashboard-controller');
const decodeToken      = require('../../unity/univer');

//Subject Api

router.post('/details',customerObj.view_dashboard);

module.exports = router;