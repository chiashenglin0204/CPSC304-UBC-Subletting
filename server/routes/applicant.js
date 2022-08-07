var express = require('express');
var router = express.Router();
var {
  getUnfinishedApps,
  createApplicant,
  getApplicantBySid,
} = require('./queryFunctions/applicantFunctions');

router.get('/unfinishedApps', getUnfinishedApps);
router.post('/createApplicant', createApplicant);
router.get('/getBySid', getApplicantBySid);

module.exports = router;
