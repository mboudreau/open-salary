/*global angular */

angular.module('demo-app', ['ui.router', 'todo'])
	.config(function($urlRouterProvider){
		$urlRouterProvider.otherwise('/');
	});

