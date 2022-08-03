var express = require('express');
var router = express.Router();
// var createUser = require('./route-helpers/users-helpers');
var {
	deleteApplicationById,
	getApplicationBySid,
	createApplication,
} = require('./route-helpers/application-helpers');
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
router.delete('/deleteApplicationById', deleteApplicationById);
router.get('/getApplicationBySid', getApplicationBySid);
router.post('/createApplication', createApplication);


module.exports = router;
