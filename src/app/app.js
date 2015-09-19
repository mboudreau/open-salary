/*global angular */

angular.module('open-salary-app', ['ui.router', 'highcharts-ng', 'verify', 'add', 'data-service'])
	.config(function ($urlRouterProvider, $stateProvider, highchartsNGProvider) {
		highchartsNGProvider.lazyLoad();
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('main', {
			url: '/',
			controller: 'AppCtrl'
		});
	})
	.controller('AppCtrl', function ($scope, $http, dataService) {

		var chartConfig = {

			options: {
				//This is the Main Highcharts chart config. Any Highchart options are valid here.
				//will be overriden by values specified below.
				chart: {
					type: 'column'
				},
				tooltip: {
					style: {
						padding: 10,
						fontWeight: 'bold'
					}
				}
			},
			//The below properties are watched separately for changes.

			//Series object (optional) - a list of series using normal highcharts series options.
			series: [
				{
					name: 'Female',
					data: [60000]
				},
				{
					name: 'Male',
					data: [80000]
				}
			],
			title: {
				text: 'Average Salary per Gender'
			},
			loading: true,
			//Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
			//properties currentMin and currentMax provied 2-way binding to the chart's maximimum and minimum
			xAxis: {
				labels: {
					enabled: false
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Salary'
				}
			},
			//Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
			//function (optional)
			func: function (chart) {
				//setup some logic for the chart
			}
		};

		$scope.chartConfig = chartConfig;

		$http.get('http://localhost:8000').
			then(function (response) {
				var data = response.data;
				// TODO: calculate data here
				$scope.chartConfig = angular.extend(chartConfig, {
					loading: false,
					series: getGenderAverage(data)
				});
			}, function(error){

			});

	});

function getGenderAverage(data) {

	return data;
}


