module.exports = exports = {

	port : (!process.env.NODE_ENV || process.env.NODE_ENV != 'production') ? 3502:80,

	mongoURL : '',

	twitter : {
		consumer_key: '',
		consumer_secret: '',
		access_token_key: '',
		access_token_secret: ''
	}

};