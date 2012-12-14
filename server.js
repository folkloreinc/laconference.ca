/*
 *
 * Init
 *
 */

var CONFIG = require('./config');
var LISTS = require('./lists');

var Ecosystem = require('./lib/ecosystem');

//Create Express
var express = require('express');
var app = express(),
	server = require('http').createServer(app).listen(CONFIG.port);
var io = require('socket.io').listen(server,{
	'flash policy port': -1
});
io.set('log level', 1);

//Twitter
var twitter = require('ntwitter');
var twit = new twitter(CONFIG.twitter);


/*
 *
 * Configuration
 *
 */

//Configure express
app.configure(function() {
	app.use(express.compress());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});
app.enable("jsonp callback");


/*
 *
 * Web server
 *
 */

//Home
app.get('/',function(req,res) {
	res.redirect(301,'http://laconference.ca');
});

//Get ecosystem
var ecosystemList = null;
var twitterUsers = [];
var ecosystem = new Ecosystem();
ecosystem.load(function(data) {
	ecosystemList = data;
	for(var id in data) {
		id = id+'';
		if(id != '813286' && id != '972651' && id != '10876852') {
			twitterUsers.push(id);
		}
	}
    if(process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
	   //createStream();
    }
});

//Import
app.get('/import',function(req,res) {
	ecosystem.import(LISTS);
	res.end('end');
});

//Ecosystem json
app.get('/ecosystem.json',function(req,res) {
	ecosystem.load(function(data) {
		res.jsonp(data);
	});
});




/*
 *
 * Socket.io
 *
 */
io.sockets.on('connection',function(socket) {
	
});


/*
 *
 * Twitter stream
 *
 */
var twitterConnectionRetries = 1;
function createStream() {

	twit.stream('statuses/filter', {

		'follow': twitterUsers.join(',')

	}, function(stream) {

		console.log('Twitter stream started');

		stream.on('data', function (data) {
			try {
				twitterConnectionRetries = 1;
				if(twitterUsers.indexOf(data.user.id_str) != -1) {
					io.sockets.emit('tweet',{
						'id' : data.id_str,
						'text' : data.text,
						'user' : {
							'id' : data.user.id_str,
							'screen_name' : data.user.screen_name
						}
					});
					//console.log(data.text);
				}

				console.log(data.text);
			} catch(e){}
		});

		stream.on('error', function (response) {
			console.log('error',arguments);
			try {
				twitterConnectionRetries = twitterConnectionRetries * 2;
				stream.destroy();
			} catch(e){}
		});

		stream.on('end', function (response) {
			try {
				twitterConnectionRetries = 1;
				stream.destroy();
			} catch(e){}
		});

		stream.on('destroy', function (response) {

			console.log('Disconnected of Twitter Streaming API');
			console.log('Reconnect in '+twitterConnectionRetries+' seconds');

			//Recreate the stream with retry delay
			setTimeout(function() {
				createStream();
			},twitterConnectionRetries * 1000);
		});
	});
}