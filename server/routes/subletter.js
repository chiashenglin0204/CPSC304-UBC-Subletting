var express = require('express');
var router = express.Router();
// var createUser = require('./route-helpers/users-helpers');
var { selectApplicationOrListingByName } = require('./route-helpers/subletter-helpers');
/* GET users listing. */
// router.get('/users', function (req, res, next) {
//   const query = 'select * from users;'
//   console.log(`running ${query}`);
//   connection.query(query, { type: connection.QueryTypes.SELECT })
//     .then(users => {
//       console.log("ran query");
//       console.log(users)
//       res.json(users)
//     })
//     .catch (error => console.error(error))
// })

//router.post('/createApplication', createApplication);
router.get(
	'/selectApplicationOrListingByName',
	selectApplicationOrListingByName
);

module.exports = router;
