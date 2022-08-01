var express = require('express');
var router = express.Router();
var { getListingCountByRoomType, getMinPriceListingsByRoomType } = require('./queryFunctions/listingFunctions');

router.get('/countByRoomType', getListingCountByRoomType);

router.get('/minPriceListingByRoomType', getMinPriceListingsByRoomType)

module.exports = router;
