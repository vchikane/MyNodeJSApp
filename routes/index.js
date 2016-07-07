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
	var key_name = 'user_' + date;
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

/* Get Modify User Page */
router.get('/edit_users',function(req,res){
	console.log("edit user")
	key=req.query.u_id;
	console.log(key);
	client.hget('users', key, function(err,data){
		console.log(data)
		//below code will rendor modify details page with all details
		res.render('update',{
			user : data,
			key : key
		}) 
	})
});

/* Update User Details */
router.post('/modify/change', function(req, res) {
	key_1 = req.body.key;
	console.log("key is " + key);
	obj = {
		'empid'  : req.body.empid, 
		'name' 	 : req.body.name,
		'mobile' : req.body.mobile
	}
	console.log("type of obj " + typeof(obj));
	console.log("value of obj " + obj);
	client.hmset('users', key_1, JSON.stringify(obj), function(err, doc) {
		res.send("User Detais Updated successfully");
	})
	
});

/* Get Delete User Page */
router.get('/delete_user',function(req,res){
	console.log("delete user")
	key=req.query.u_id;
	client.hget('users', key, function(err,data){
		console.log(data)
		res.render('delete',{
			user : data,
			key : key
		})
	})
});

/* Delete User */
router.post('/delete/remove', function(req, res) {
	key_1 = req.body.key;
	console.log(key_1);
	client.hdel('users', key_1, function() {
		res.send("User Deleted successfully");
	})
	
});




module.exports = router;