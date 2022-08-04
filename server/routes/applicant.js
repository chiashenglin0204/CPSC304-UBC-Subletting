var express = require('express');
var router = express.Router();
var { getUnfinishedApps } = require('./queryFunctions/applicantFunctions');

router.get('/unfinishedApps', getUnfinishedApps)

module.exports = router;