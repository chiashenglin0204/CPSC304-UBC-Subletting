var express = require('express');
var router = express.Router();
var { selectApplicationOrListingByName, createSubletter, getSubletterBySid } = require('./queryFunctions/subletterFunctions');

router.get(
	'/selectApplicationOrListingByName',
	selectApplicationOrListingByName
);
router.post('/createSubletter', createSubletter);
router.get('/getBySid', getSubletterBySid);



module.exports = router;
