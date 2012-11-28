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
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
server.listen(CONFIG.port);

io.set('log level', 1);

//Twitter
var twitter = require('ntwitter');
var twit = new twitter(CONFIG.twitter);

//Create mongodb link
//var mongoose = require('mongoose');
//mongoose.connect(CONFIG.mongoURL);


/*
 *
 * Configuration
 *
 */
var PUBLIC_FOLDER = __dirname + "/app";
var STYLES_FOLDER = __dirname + "/temp/styles";

//Template engine
var consolidate = require('consolidate');
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', PUBLIC_FOLDER);

//Configure express
app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(PUBLIC_FOLDER));
    app.use('/styles', express.static(STYLES_FOLDER));
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
	res.render('index');
});

//Update
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
	createStream();
});

app.get('/import',function(req,res) {
	ecosystem.import(LISTS);
	res.end('end');
});
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

	console.log('Twitter stream follow',twitterUsers.join(','));

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
				twitterConnectionRetries++;
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