// FACTORIES
	
	// FirstFactory
		App.factory('FirstFactory', function ($http){
			var factory = {};
			// SESSION VARIABLES

			factory.firstMethod = function (callback){
				console.log('> REQUESTING firstMethod DATA FROM SERVER ...');
				$http.get('/firstMethod').success(function (response){
					console.log('RECEIVED response FROM SERVER ...');
					callback(response);
				});
			}

			factory.secondMethod = function (callback){
				console.log('> REQUESTING secondMethod DATA FROM SERVER ... ');
				$http.get('/secondMethod').success(function (response){
					console.log('RECEIVED response FROM SERVER ... ');
					callback(response)
				});
			}
			// factory.factoryMethod = function (parameter, callback){
			// 	console.log('> POSTING parameter: ... ');
			// 	console.log(parameter);
			// 	console.log(' ... TO SERVER ...');
			// 	$http.post('/factoryMethod', parameter).success(function (response){
			// 		callback(response);
			// 	});
			// }

			return factory;
		});