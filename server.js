/*
 *
 * Init
 *
 */

var CONFIG = require('./config');

//Create Express
var express = require('express');
var app = express();

//Twitter
var twitter = require('ntwitter');
var twit = new twitter(CONFIG.twitter);

//Bitly
var Bitly = require('bitly');
var bitly = new Bitly(CONFIG.bitly.username, CONFIG.bitly.key);

//Create mongodb link
var mongoose = require('mongoose');
mongoose.connect(CONFIG.mongoURL);

//When running localy use the non builded folder
if(!process.env.NODE_ENV || process.env.NODE_ENV != 'production') {
	var publicFolder = __dirname + "/app";

//When running nodejitsu use builded folder
} else {
	var publicFolder = __dirname + "/dist";
}

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
app.listen(CONFIG.port);

//Home
app.get('/',function(req,res) {
	res.render('index');
});