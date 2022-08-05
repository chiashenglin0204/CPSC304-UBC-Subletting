var express = require('express');
var router = express.Router();
var {
	createUser,
	updateUser,
	getUsers,
} = require('./queryFunctions/userFunctions');

router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.get('/', getUsers);

module.exports = router;
