(function () {
	'strict'
	angular.module('TechData.pages.dashboard')
		.controller('dashboardCtrl', function ($scope, $http, toastr, baConfig, api_url) {
			var vm = this;
			var layoutColors = baConfig.colors;
			var status = {
				loanOptions: {
					elements: {
						arc: {
							borderWidth: 1
						}
					},
					legend: {
						display: true,
						position: 'bottom',
						labels: {
							fontColor: layoutColors.defaultText
						}
					}
				},
			}
			$scope.status = status

			vm.getLoanStatus = function () {
				$http.post(api_url + 'admin/dashboard/loanStatus', {})
					.then(function (res) {
						$scope.status.loanLabels = res.data.list.loanLabels
						$scope.status.loanData = res.data.list.loanData
					}).catch(function (err) {
						if (err.data && err.data.message) {
							toastr.error(err.data.message, {
								timeOut: 3000
							})
						} else {
							toastr.error("Unable to fetch status of loans", {
								timeOut: 3000
							})
						}
					})
			}

			vm.getLoanStatus();

		})
}());