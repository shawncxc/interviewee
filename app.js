//-------------------------------- server require ---------------------------------
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');

//-------------------------------- database ---------------------------------
var mongodb = require('mongodb');
var assert = require('assert');
var client = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/interviewee'

//-------------------------------- server setting ---------------------------------
var app = express();
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//-------------------------------- server middleware ---------------------------------
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser('cookie'));
app.use(session({secret: 'secret',
				resave: true,
				saveUninitialized: true}
				));
app.use(express.static(path.join(__dirname, '/public/js')));
app.use(express.static(path.join(__dirname, '/public/css')));

//-------------------------------- routes ---------------------------------
app.get('/', function(req, res){
	res.render(app.get('views') + '/login.jade');
});

app.post('/signup', function(req, res){
	client.connect(url, function(err, db){
		db.collection('users').insertOne(req.body, function(err, res){
			assert.equal(null, err);
			assert.equal(1, res.insertedCount);
			req.session.username = req.body.username;
			db.close();
			res.render(app.get('views') + '/main.jade', {username: req.session.username});
		});
	});
});

app.post('/main', function(req, res){
	client.connect(url, function(err, db){
		db.collection("users").find(req.body).toArray(function(err, data){
			if(data.length === 1){
				req.session.username = data[0].username;
				db.close();
				res.render(app.get('views') + '/main.jade', {username: req.session.username});
			}
			else{
				res.send("No such Username or Password");	
			}
		});
	});
});

app.post('/addone', function(req, res){
	client.connect(url, function(err, db){
		db.collection("interviews").insertOne(req.body, function(err, res){
			assert.equal(null, err);
			assert.equal(1, res.insertedCount);
			db.close();
		});
		res.sendStatus(200);
	});
});

app.post('/deleteone', function(req, res){
	client.connect(url, function(err, db){
		db.collection("interviews").remove(req.body, function(err, res){
			assert.equal(null, err);
			db.close();
		});
		res.sendStatus(200);
	});
});

app.post('/interviewingone', function(req, res){
	client.connect(url, function(err, db){
		db.collection("interviews").update(req.body, {$set: {status: 1}},
			function(err, res){
				assert.equal(null, err);
				db.close();
		});
		res.sendStatus(200);
	});
});

app.post('/offeredone', function(req, res){
	client.connect(url, function(err, db){
		db.collection("interviews").update(req.body, {$set: {status: 2}},
			function(err, res){
				assert.equal(null, err);
				db.close();
		});
		res.sendStatus(200);
	});
});

app.post('/rejectedone', function(req, res){
	client.connect(url, function(err, db){
		db.collection("interviews").update(req.body, {$set: {status: 3}},
			function(err, res){
				assert.equal(null, err);
				db.close();
		});
		res.sendStatus(200);
	});
});

app.get('/getall', function(req, res){
	var username = req.session.username;
	var query = {username: username};
	client.connect(url, function(err, db){
		db.collection("interviews").find(query).toArray(function(err, data){
			res.send(data);
			db.close();
		});
	});
});

//-------------------------------- port ---------------------------------
app.listen(app.get('port'), function(){
	console.log("listening on port " + app.get('port'));
});