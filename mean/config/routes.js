
var	FirstController = require('../server/controllers/firstController.js');

module.exports = function (app){

// LOCAL
	// FirstController
		// GET
		app.get('/firstMethod', function (req, res){
			console.log('> ROUTING REQUEST FOR firstMethod ...');
			
		});

		app.get('/secondMethod', function (req, res){
			console.log('> ROUTING REQUEST FOR secondMethod ...');

			FirstController.secondMethod(req,res);
		});

		// POST
}