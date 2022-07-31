var express = require('express');
var router = express.Router();
var connection = require('../database/sequelize.js');
var initTables = require('../../oldFileDump/chiasheng-javascript/initTable.js');


/* GET home page. */
router.get('/', async (req, res, next) => {
	res.render('index', { title: 'Express' });
});

router.get('/users', function (req, res, next) {
	const query = 'select * from users;';
	console.log(`running ${query}`);
	connection
		.query(query, { type: connection.QueryTypes.SELECT })
		.then(users => {
			console.log('ran query');
			console.log(users);
			res.json(users);
		})
		.catch(error => console.error(error));
});

module.exports = router;
