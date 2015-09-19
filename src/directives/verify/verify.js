/*global angular */

angular.module('verify', ['ui.router', 'satellizer', 'templates-directives'])
	.config(function ($stateProvider, $authProvider) {

		$authProvider.google({
			clientId: '1013743500975-39ikf455jn7j8fttf8r0kv5o9mpf4n5s.apps.googleusercontent.com',
			redirectUri: 'http://opensalary.s3-website-ap-southeast-2.amazonaws.com/auth/google'
		});

		// secret YTiA1TduxzCk0HY9Sdsy04uV

		$stateProvider.state('verify', {
			url: '/verify',
			template: '<div verify></div>'
		});
	})
	.directive('verify', function ($auth) {
		return {
			restrict: 'AE',
			scope: {
			},
			templateUrl: 'verify/verify.tpl.html',
			link: function (scope, element, attrs) {
				// Adding default class
				// element.addClass('stat-card');

				scope.authenticate = function(provider) {
					$auth.authenticate(provider)
						.then(function() {
							toastr.success('You have successfully signed in with ' + provider);
							$location.path('/');
						})
						.catch(function(response) {
							toastr.error(response.data.message);
						});
				};
			}
		};
	});

