/*global angular */

angular.module('open-salary-app', ['ui.router'])
	.config(function($urlRouterProvider){
		$urlRouterProvider.otherwise('/');
	});

