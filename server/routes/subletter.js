var express = require('express');
var router = express.Router();
var { selectApplicationOrListingByName } = require('./queryFunctions/subletterFunctions');

router.get(
	'/selectApplicationOrListingByName',
	selectApplicationOrListingByName
);

module.exports = router;
