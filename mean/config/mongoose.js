// MODULES
var mongoose = require('mongoose'),
	fs = require('fs'),
	models_path = __dirname + '/../server/models';

// MONGOOSE -> MONGO
mongoose.connect('mongodb://localhost/shopifyPractice');

// LOAD MODELS
fs.readdirSync(models_path).forEach( function (file){
	if( file.indexOf('.js') ){
		require( models_path + '/' + file );
	}
});