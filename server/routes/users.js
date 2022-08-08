var express = require('express');
var router = express.Router();
var {
	createUser,
	updateUser,
	getUsers,
	getUserBySidPhoneNum,
} = require('./queryFunctions/userFunctions');

router.post('/createUser', createUser);
router.put('/updateUser', updateUser);
router.get('/', getUsers);
router.get('/byIdPhoneNum', getUserBySidPhoneNum);

module.exports = router;
