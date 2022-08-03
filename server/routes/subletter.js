var express = require('express');
var router = express.Router();
var { selectApplicationOrListingByName } = require('./route-helpers/subletter-helpers');

router.get(
	'/selectApplicationOrListingByName',
	selectApplicationOrListingByName
);

module.exports = router;
