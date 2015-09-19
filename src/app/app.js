/*global angular */

angular.module('open-salary-app', ['ui.router', 'verify', 'add'])
	.config(function($urlRouterProvider){
		$urlRouterProvider.otherwise('/');
	});

