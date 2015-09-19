/*global angular */

angular.module('open-salary-app', ['ui.router', 'verify'])
	.config(function($urlRouterProvider){
		$urlRouterProvider.otherwise('/');
	});

