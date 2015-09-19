/*global angular */

angular.module('open-salary-app', ['ui.router', 'verify', 'add'])
	.config(function($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('main', {
			url: '/',
			controller: 'AppCtrl'
		});
	})
	.controller('AppCtrl', function(scope){
		//https://api.typeform.com/v0/form/PYLdZY?key=41ef2b0da9b7f1f4991f6b0fd45dcf5ce8387e56&completed=true
	});


