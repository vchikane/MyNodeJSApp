var express = require('express');
var router = express.Router();
var client = require('../redis_lib/redis_connection.js');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;