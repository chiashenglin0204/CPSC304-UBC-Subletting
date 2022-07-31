var express = require('express');
var router = express.Router();
var { getListingCountByRoomType } = require('./queryFunctions/listingFunctions');

router.get('/countByRoomType', getListingCountByRoomType);

module.exports = router;
