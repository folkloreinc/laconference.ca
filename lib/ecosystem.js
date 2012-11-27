//Config
var CONFIG = require('../config');

//Mongoose
var mongoose = require('mongoose');
mongoose.connect(CONFIG.mongoURL);
var UserSchema = require('./schemas/user');
var UserModel = mongoose.model('user', UserSchema);

//Twitter
var twitter = require('ntwitter');
var twit = new twitter(CONFIG.twitter);







var Ecosystem = function() {

	this.ecosystem = null;
	

};


Ecosystem.prototype.load = function(cb) {
	
	cb = cb || function(){};

	if(this.ecosystem) {
		cb(this.ecosystem);
		return;
	}

	var self = this;

	var query = UserModel.find();
	query.exec(function (err, data) {

		console.log(data.length);

		var users = {};
		for(var i = 0; i < data.length; i++) {
			users[data[i].id] = {
				'id' : data[i].id,
				'screen_name' : data[i].screen_name,
                'profile_image_url': data[i].profile_image_url,
				'text' : data[i].last_status.text,
				'friends' : []
			};

			//console.log(users);
		}

		for(var i = 0; i < data.length; i++) {
			for(var ii = 0; ii < data[i].friendsIds.length; ii++) {
				var friendId = data[i].friendsIds[ii];
				if(users[friendId]) {
					users[data[i].id].friends.push(friendId);
				}
			}
		}

		self.ecosystem = users;

		cb(users);

	});

};

Ecosystem.prototype.import = function(lists){

	var query = UserModel.find();
	query.where('screen_name').in(lists)
	query.exec(function (err, data) {

		//Filter users
		var usersToImport = [];
		for(var i = 0; i < lists.length; i++) {
			var found = false;
			for(var ii = 0; ii < data.length; ii++) {
				if(data[ii].screen_name.toLowerCase() == lists[i].toLowerCase()) {
					found = true;
				}
			}
			if(!found) {
				usersToImport.push(lists[i]);
			}
			if(usersToImport.length == 25) {
				break;
			}
		}

		function importFriends() {
			//Ecosystem.importFriends(function() {
				var query = UserModel.find();
				query.exec(function (err, data) {
					Ecosystem.importFriendsUsers(data,function() {
						/*var query = UserModel.find();
						query.exec(function (err, data) {
							for(var i = 0; i < data.length; i++) {
								data[i].friends = [];
								for(var ii = 0; ii < data[i].friendsIds.length; ii++) {
									for(var iii = 0; iii < data.length; iii++) {
										if(parseInt(data[i].friendsIds[ii]) == parseInt(data[iii].id)) {
											data[i].friends.push(data[iii]._id);
										}
									}
								}
								data[i].save(function(err,data) {
									console.log('save',data.friends);
								});
							}
						});*/
					});
				});
			//});
		}

		//Import users and import friends
		if(usersToImport.length) {
			console.log('usersToImport',usersToImport.join(','));
			Ecosystem.importUsers(usersToImport,importFriends);
		} else {
			importFriends();
		}

	});
}


Ecosystem.importFriendsUsers = function(users,cb) {

	cb = cb || function(){};

	var friends = {};
	for(var i = 0; i < users.length; i++) {
		for(var ii = 0; ii < users[i].friendsIds.length; ii++) {
			var id = users[i].friendsIds[ii]+'';
			if(!friends[id]) {
				friends[id] = 0;
			}
			friends[id]++;
		}
	}
	var friendsArray = [];
	for(var id in friends) {
		friendsArray.push({
			'id' : id,
			'count' : friends[id]
		});
	}
	friendsArray.sort(function(a,b) {
		if(a.count == b.count) return 0;
		return a.count > b.count ? -1:1; 
	});
	var friendsMostPopular = [];
	for(var i = 0; i < friendsArray.length; i++) {
		friendsMostPopular.push(friendsArray[i].id);
		if(i == 200) {
			break;
		}
	}
	var query = UserModel.find();
	query.where('id').in(friendsMostPopular)
	query.exec(function (err, data) {

		var usersToImport = [];
		for(var i = 0; i < friendsMostPopular.length; i++) {
			var found = false;
			for(var ii = 0; ii < data.length; ii++) {
				if(data[ii].id == friendsMostPopular[i]) {
					found = true;
				}
			}
			if(!found) {
				usersToImport.push(parseInt(friendsMostPopular[i]));
			}
			if(usersToImport.length == 25) {
				break;
			}
		}

		console.log(usersToImport.join(','));
		if(usersToImport.length) {
			Ecosystem.importUsers(usersToImport,function() {
				cb();
			});
		} else {
			cb();
		}

	});

};

Ecosystem.importUsers = function(lists,cb) {

	cb = cb || function(){};

	var loadingCount = 0;
	var doneCount = 0;

	Ecosystem.getUsers(lists,function(users) {

		for(var i = 0; i < users.length; i++) {

			var userObj = Ecosystem.buildUserObject(users[i]);
			userObj.friendsIds = [];
			var user = new UserModel(userObj);
			user.save(function(err,data) {
				console.log(err,data);
				doneCount++;
				if(loadingCount == doneCount) {
					cb();
				}
			});
			loadingCount++;

		}
	});
};

Ecosystem.importFriends = function(cb) {

	console.log('importFriends');

	cb = cb || function(){};

	var query = UserModel.find();
	query.where('friendsIds').equals([]);
	query.exec(function (err, users) {

		console.log('needs to load friends for',users.length);

		function loadNext() {

			var user = users.shift();

			console.log('loadNext',user.screen_name);

			//Skip if user as already friends
			if(user.friendsIds.length) {
				console.log('friends already loaded',user.screen_name);
				nextLoop();
				return;
			}

			//Fetch friends from twitter
			//var fetchDelay = Math.round(Math.random() * 30000);
			var fetchDelay = 62000;
			console.log('fetch in',Math.round(fetchDelay/1000));
			setTimeout(function() {

				twit.getFriendsIds(user.screen_name,function(err,data) {

					console.log('importFriends getFriendsIds');
					if(err) {
						console.log('error:',err);
						var retryDelay = ((err.headers['x-rate-limit-reset']*1000) - Date.parse(err.headers['date']))+2000;
						console.log('rate limit, retry in',Math.round(retryDelay/1000));
						users.push(user);
						setTimeout(function() {
							nextLoop();
						},retryDelay);
						return;
					}

					user.friendsIds = [];
					if(data && data.length) {
						for(var i = 0; i < data.length; i++){
							user.friendsIds.push(data[i]);
						}
						console.log('saving friends',user.screen_name,user.friendsIds.join(','));
						user.save(function(err,data) {
							console.log('save friendsIds');
							//console.log(err,data);
						});
					}

					nextLoop();
					
				});

			},fetchDelay);

			
		}

		function nextLoop() {
			console.log(users.length,'users remaining');
			if(users.length) {
				loadNext();
			} else {
				cb();
			}
		}

		nextLoop();
		
	});

	cb = cb || function(){};

	var loadingCount = 0;
	var doneCount = 0;

	
}

//Users object cache to reduce call on twitter
Ecosystem._usersCache = {};


//Get users with internal cache
Ecosystem.getUsers = function(lists,cb) {

	var users = [];

	var usersToLoad = [];
	for(var i = 0; i < lists.length; i++) {
		var id = lists[i];
		if(Ecosystem._usersCache[id]) {
			users.push(Ecosystem._usersCache[id]);
		} else {
			usersToLoad.push(id);
		}
	}

	twit.showUser(usersToLoad,function(err,data) {

		if(err) {
			console.log('ERROR',err);
		}

		//Build user list
		for(var i = 0; i < data.length; i++) {
			var user = data[i];
			var id = user.id_str;
			Ecosystem._usersCache[user.screen_name] = user;
			users.push(user);
		}

		cb(users);

	});

};

//Build simplified user object
Ecosystem.buildUserObject = function(user) {
	
	var userObj = {
		'id' : user.id_str,
		'screen_name' : user.screen_name,
        'profile_image_url': user.profile_image_url,
		'last_status' : {},
		//'followers' : []
	};
	if(user.status && user.status.id_str) {
		userObj.last_status = {
			'id' : user.status.id_str,
			'text' : user.status.text
		}
	}

	return userObj;
};


module.exports = exports = Ecosystem;