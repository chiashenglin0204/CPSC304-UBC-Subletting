var express = require('express');
var router = express.Router();
var {
	createUser,
	updateUser,
	getUser,
} = require('./route-helpers/user-helpers');

router.post('/createUser', createUser);
router.post('/updateUser', updateUser);
router.get('/', getUser);

module.exports = router;
