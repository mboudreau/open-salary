/*global angular */

angular.module('open-salary-app', ['ui.router', 'highcharts-ng', 'verify', 'add'])
	.config(function ($urlRouterProvider, $stateProvider, highchartsNGProvider) {
		highchartsNGProvider.lazyLoad();
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('main', {
			url: '/',
			controller: 'AppCtrl'
		});
	})
	.controller('AppCtrl', function ($scope, $http) {

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
			/*series: [
				{
					name: 'Female',
					data: [60000]
				},
				{
					name: 'Male',
					data: [80000]
				}
			],*/
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
				min: 60000,
				title: {
					text: 'Salary'
				}
			},

			tooltip: {
				formatter: function() {
					return '<b>'+ this.x +'</b><br/>'+
						this.series.name +': '+ this.y +'<br/>'+
						'Diff: '+ Math.abs(this.point.stackTotal-this.y);
				}
			},
			//Whether to use HighStocks instead of HighCharts (optional). Defaults to false.
			//function (optional)
			func: function (chart) {
				//setup some logic for the chart
			}
		};

		$scope.chartConfig = chartConfig;

		var ethnicChart, genderChart;

		$http.get('http://localhost:8000').
			then(function (response) {
				var data = response.data;
				var gender = getGenderAverage(data);

				var maleAvg = gender[1].data[0], femaleAvg = gender[0].data[0];
				$scope.difference = Math.abs(maleAvg - femaleAvg);
				$scope.percent = Math.floor(((maleAvg/femaleAvg)-1)*10000)/100;

				var professions = [];
				for(var i = 0, len = data.length; i<len; i++) {
					var p = data[i].Profession;
					if(p && p.length !== 0) {
						professions.push(p);
					}
				}
				$scope.professions = professions;

				$scope.chartConfig = angular.extend(chartConfig, {
					loading: false,
					//series: getGenderAverage(data)
					series: getEthnicAverage(data)
				});
			}, function (error) {

			});

	});

function getGenderAverage(data) {
	var femaleTotal = 0, maleTotal = 0, maleCount = 0, femaleCount = 0;

	for(var i = 0, len = data.length; i<len; i++) {
		var answer = data[i];
		if(answer.YearSalary) {
			switch(answer.Gender) {
				case 'Male':
					maleCount++;
					maleTotal += parseInt(answer.YearSalary);
					break;
				case 'Female':
					femaleCount++;
					femaleTotal += parseInt(answer.YearSalary);
					break;
			}
		}
	}

	return [{
		name: 'Female',
		data: [Math.floor(femaleTotal/femaleCount)]
	},
	{
		name: 'Male',
		data: [Math.floor(maleTotal/maleCount)]
	}];

}

function getEthnicAverage(data) {
	var ethnicities = {};

	for(var i = 0, len = data.length; i<len; i++) {
		var answer = data[i];
			if(answer.YearSalary) {
				if(!ethnicities[answer.Ethnicity]) {
					ethnicities[answer.Ethnicity] = {
						total:0,
						count:0
					};
				}

				ethnicities[answer.Ethnicity].total = ethnicities[answer.Ethnicity].total + parseInt(answer.YearSalary);
				ethnicities[answer.Ethnicity].count = ethnicities[answer.Ethnicity].count + 1;
			}
	}

	var series = [];

	for(var key in ethnicities) {
		series.push({name: key, data: [Math.floor(ethnicities[key].total/ethnicities[key].count)]})
	}

	console.info(JSON.stringify(series));

	return series;
}
