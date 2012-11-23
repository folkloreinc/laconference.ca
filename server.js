/*
 *
 * Init
 *
 */

var CONFIG = require('./config');

//Create Express
var express = require('express');
var app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
app.listen(CONFIG.port);

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
var PUBLIC_FOLDER = __dirname + "/dist";

//Template engine
var consolidate = require('consolidate');
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', PUBLIC_FOLDER);

//Configure express
app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(PUBLIC_FOLDER));
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

		'track': 'bullshitteur.ca'

	}, function(stream) {

		console.log('Twitter stream started');

		stream.on('data', function (data) {
			try {
				twitterConnectionRetries = 1;
				io.sockets.emit('tweet',data);
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
createStream();