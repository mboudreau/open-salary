/*global angular */

angular.module('open-salary-app', ['ui.router', 'highcharts-ng', 'verify', 'add', 'templates-bootstrap', 'ui.bootstrap.buttons', 'ui.bootstrap.typeahead'])
	.config(function ($urlRouterProvider, $stateProvider, highchartsNGProvider) {
		highchartsNGProvider.lazyLoad();
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('main', {
			url: '/',
			controller: 'AppCtrl'
		});
	})
	.controller('AppCtrl', function ($scope, $http) {

		var chartConfig = {}, responseData;

		$scope.generateChart = function(type) {
			chartConfig = {

				options: {
					//This is the Main Highcharts chart config. Any Highchart options are valid here.
					//will be overriden by values specified below.
					chart: {
						type: 'column'
					},
					tooltip: {
						enabled: false
					}
				},
				//The below properties are watched separately for changes.

				//Series object (optional) - a list of series using normal highcharts series options.
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
				}
			};

			function setConfig() {
				var data, title;
				switch(type) {
					case 'gender':
						title = 'Average Salary per Gender';
						data = getGenderAverage(responseData);
						break;
					case 'ethnicity':
						title = 'Average Salary per Ethnicity';
						data =  getEthnicAverage(responseData);
				}
				$scope.chartConfig = angular.extend(chartConfig, {
					loading: false,
					title: {
						text: title
					},
					series: data
				});
			}

			if(!responseData) {
				$http.get('http://localhost:8000').
					then(function (response) {
						responseData = response.data;
						var gender = getGenderAverage(responseData);

						var maleAvg = gender[1].data[0], femaleAvg = gender[0].data[0];
						$scope.difference = Math.abs(maleAvg - femaleAvg);
						$scope.percent = Math.floor(((maleAvg/femaleAvg)-1)*10000)/100;

						var professions = [];
						for(var i = 0, len = responseData.length; i<len; i++) {
							var p = responseData[i].Profession;
							if(p && p.length !== 0) {
								professions.push(p);
							}
						}
						$scope.professions = professions;

						setConfig();
					}, function (error) {


					});
			}else{
				setConfig();
			}

		};

		$scope.generateChart('gender');

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
		data: [Math.floor(femaleTotal/femaleCount)],
		dataLabels: {
	      enabled: true,
	      // rotation: -90,
	      color: '#FFFFFF',
	      align: 'right',
	      format: '${point.y:.0f}',
	      y: 30, // 10 pixels down from the top
	      style: {
	          fontSize: '13px',
	          fontFamily: 'Open Sans, sans-serif'
	      }
	  }
	},
	{
		name: 'Male',
		data: [Math.floor(maleTotal/maleCount)],
		dataLabels: {
	      enabled: true,
	      // rotation: -90,
	      color: '#FFFFFF',
	      align: 'right',
	      format: '${point.y:.0f}',
	      y: 30, // 10 pixels down from the top
	      style: {
	          fontSize: '13px',
	          fontFamily: 'Open Sans, sans-serif'
	      }
	  }
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
		series.push({name: key,
			data: [Math.floor(ethnicities[key].total/ethnicities[key].count)],
			dataLabels: {
					enabled: true,
					// rotation: -90,
					color: '#FFFFFF',
					align: 'right',
					format: '${point.y:.0f}',
					y: 30, // 10 pixels down from the top
					style: {
							fontSize: '13px',
							fontFamily: 'Open Sans, sans-serif'
					}
			}
		})
	}

	return series;
}
