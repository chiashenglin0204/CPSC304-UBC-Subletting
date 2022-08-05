var express = require('express');
var router = express.Router();
var {
	createUser,
	updateUser,
	getUser,
} = require('./queryFunctions/userFunctions');

router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.get('/', getUser);

module.exports = router;
