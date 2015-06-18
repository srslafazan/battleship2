// REQUIRE MONGOOSE, MODELS
var mongoose 	= require('mongoose');
var First		= mongoose.model('First');

module.exports = (function(){
	return {
		
		firstMethod: function (req, res){
			console.log('> RUNNING firstMethod IN firstController ...');

			// First.find({}, function (err, results){
			// 	if(err){
			// 		console.log(err);
			// 	} else {
					// res.json(results);
			// 	}
			// });
		} 

	}
})();