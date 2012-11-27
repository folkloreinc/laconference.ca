/*
 *
 * Collection schema
 *
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Schema
var schema = mongoose.Schema({
	'id' : {
		'type' : 'string',
		'unique' : true
	},
	'screen_name' : {
		'type' : 'string',
		'unique' : true
	},
    'profile_image_url' : {
        'type' : 'string'
    },
	'last_status' : {
		'id' : {
			'type' : 'string'
		},
		'text' : {
			'type' : 'string'
		}
	},
  	'friendsIds' : {
		'type' : 'array',
		'unique' : true
	},
  	'friends' : [
  		{
  			'type' : Schema.Types.ObjectId,
  			'ref' : 'user'
  		}
  	]
});

//Module exports
module.exports = schema;