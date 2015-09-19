/*global angular */

angular.module('add', ['ui.router', 'satellizer', 'templates-directives'])
	.config(function ($stateProvider, $authProvider) {

		$authProvider.google({
			clientId: '1013743500975-39ikf455jn7j8fttf8r0kv5o9mpf4n5s.apps.googleusercontent.com',
			redirectUri: 'http://opensalary.s3-website-ap-southeast-2.amazonaws.com/auth/google'
		});

		// secret YTiA1TduxzCk0HY9Sdsy04uV

		$stateProvider.state('add', {
			url: '/add',
			template: '<div add></div>'
		});
	})
	.directive('add', function ($auth, $location) {
		return {
			restrict: 'AE',
			scope: {
			},
			templateUrl: 'verify/verify.tpl.html',
			link: function (scope, element, attrs) {
				// Adding default class
				// element.addClass('stat-card');

			}
		};
	});

