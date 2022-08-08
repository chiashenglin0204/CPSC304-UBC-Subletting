var express = require('express');
var router = express.Router();
var {
  getListingCountForRoomTypes,
  getMinPriceListingsByRoomType,
  getPopularListings,
  getSimpleListingsDisplay,
  getAllListings,
} = require('./queryFunctions/listingFunctions');

router.get('/countForRoomTypes', getListingCountForRoomTypes);

router.get('/minPriceListingByRoomType', getMinPriceListingsByRoomType);

router.get('/popularListings', getPopularListings);

router.get('/getAll', getAllListings);

router.get('/simpleListingsDisplay', getSimpleListingsDisplay)

module.exports = router;
