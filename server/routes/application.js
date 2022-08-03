var express = require('express');
var router = express.Router();
var {
	deleteApplicationById,
	getApplicationBySid,
	createApplication,
} = require('./route-helpers/application-helpers');

router.delete('/deleteApplicationById', deleteApplicationById);
router.get('/getApplicationBySid', getApplicationBySid);
router.post('/createApplication', createApplication);

module.exports = router;
