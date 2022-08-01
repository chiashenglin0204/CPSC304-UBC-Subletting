var express = require('express');
var router = express.Router();
var { getListingCountByRoomType, getMinPriceListings } = require('./queryFunctions/listingFunctions');

router.get('/countByRoomType', getListingCountByRoomType);

router.get('/minPriceListing', getMinPriceListings)

module.exports = router;
