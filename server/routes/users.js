var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function (req, res, next) {
  const query = 'select * from users;'
  console.log(`running ${query}`)
  connection.query(query, { type: connection.QueryTypes.SELECT })
    .then(users => {
      console.log("ran query");
      console.log(users)
      res.json(users)
    })
    .catch (error => console.error(error))
})

module.exports = router;
