var express = require('express');
var router = express.Router();
var { getListingCountForRoomTypes, getMinPriceListingsByRoomType } = require('./queryFunctions/listingFunctions');

router.get('/countForRoomTypes', getListingCountForRoomTypes);

router.get('/minPriceListingByRoomType', getMinPriceListingsByRoomType)

module.exports = router;
