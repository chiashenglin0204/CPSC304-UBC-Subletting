var express = require('express');
var router = express.Router();
var {
  getListingCountForRoomTypes,
  getMinPriceListingsByRoomType,
  getPopularListings,
  getCustomListingsDisplay,
<<<<<<< HEAD
  getAllListings,
=======
>>>>>>> kenny/FE_aggregationGroupBy_countListingByRoomType
} = require('./queryFunctions/listingFunctions');

router.get('/countForRoomTypes', getListingCountForRoomTypes);

router.get('/minPriceListingByRoomType', getMinPriceListingsByRoomType);

router.get('/popularlistings', getPopularListings);
<<<<<<< HEAD

router.get('/getAll', getAllListings);
=======
>>>>>>> kenny/FE_aggregationGroupBy_countListingByRoomType

// router.get('/customListingsDisplay', getCustomListingsDisplay)

module.exports = router;
