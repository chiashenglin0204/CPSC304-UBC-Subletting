var express = require('express');
var router = express.Router();
var {
  getListingCountForRoomTypes,
  getMinPriceListingsByRoomType,
  getPopularListings,
  getListingByGender,
  getAllListings,
} = require('./queryFunctions/listingFunctions');

router.get('/countForRoomTypes', getListingCountForRoomTypes);

router.get('/minPriceListingByRoomType', getMinPriceListingsByRoomType);

router.get('/popularListings', getPopularListings);

router.get('/getAll', getAllListings);

router.get('/genderFilter', getListingByGender)

module.exports = router;
