// CONFIG
var App = angular.module('App', ['ngRoute', 'LocalStorageModule']);

App.config( function($routeProvider){
	$routeProvider
	.when('/something',{
		templateUrl: 'partials/something.html'
	})
});