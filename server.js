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

var publicFolder = __dirname + "/dist";

//Template engine
var consolidate = require('consolidate');
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', publicFolder);

//Configure express
app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(publicFolder));
});
app.enable("jsonp callback");

//Home
app.get('/',function(req,res) {
	res.render('index');
});