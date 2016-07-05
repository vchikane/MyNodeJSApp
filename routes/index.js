var express = require('express');
var router = express.Router();
var client = require('../redis_lib/redis_connection.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express'});
});

/* Get Create User Page */
router.get('/create', function(req, res) {
	res.render('create');
});

/* Insert record into redis hash */
router.post('/create/add', function(req, res) {
	//generating unique key using currect time
	var date =  Math.floor(Date.now()/1000);
	var key_name = 'user_'+date;
	console.log(key_name);

	obj = {
		'empid'  : req.body.empid, 
		'name' 	 : req.body.name,
		'mobile' : req.body.mobile
	};

	//calling redis method to store data
	client.hmset('users', key_name, JSON.stringify(obj), function(err,doc) {
		res.send('User created successfully');
	});
	
});

router.get('/users', function(req, res) {
	client.hgetall("users", function(err, resp) {
		res.render('userList', {
			users: resp
		})
	})
});

module.exports = router;