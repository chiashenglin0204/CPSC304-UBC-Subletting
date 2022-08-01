var express = require('express');
var router = express.Router();
var { createUser, getUsers } = require('./queryFunctions/userFunctions');

router.get('/', getUsers);

router.post('/createUser', createUser);

module.exports = router;
