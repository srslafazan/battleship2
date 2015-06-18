// CONTROLLERS

	// FirstController
		App.controller('FirstController', function ($scope, $location, localStorageService, FirstFactory){
			// ON LOAD
				// $scope objects 

			FirstFactory.firstMethod(function (responseData){
				console.log('> RECEIVED responseData FROM FirstFactory firstMethod ... ');
				console.log(responseData);
			});

			FirstFactory.secondMethod(function (responseData){
				console.log('> RECEIVED responseData FROM FirstFactory firstMethod ... ');
				console.log(responseData);
			});

			// ON PROMPT
			// $scope.controllerMethod = function (parameter){
			// 	FirstFactory.factoryMethod(parameter, function (responseData){
			// 		console.log('> ... RESPONSE DATA FROM FACTORY: ');
			// 		console.log(responseData);
			// 	});
			// }
			
		});