var express = require('express');
var router = express.Router();
var {
  getListingCountForRoomTypes,
  getMinPriceListingsByRoomType,
  getPopularListings,
  getCustomListingsDisplay,
  getAllListings,
} = require('./queryFunctions/listingFunctions');

router.get('/countForRoomTypes', getListingCountForRoomTypes);

router.get('/minPriceListingByRoomType', getMinPriceListingsByRoomType);

router.get('/popularlistings', getPopularListings);

router.get('/getAll', getAllListings);

// router.get('/customListingsDisplay', getCustomListingsDisplay)

module.exports = router;
