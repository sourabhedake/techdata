(function () {
	'strict'
	angular.module('TechData.pages.settings')
		.controller('settingsCtrl', function ($scope, $state, $http, toastr, api_url) {
			var vm = this
			
			vm.fetchSettings = function () {
				$http.post(api_url+'admin/getSettings', {}).then(function (res) {
					vm.organisation = res.data.organisation
				}).catch(function (err) {
					vm.error = err.data.message
				})
			}
			vm.fetchSettings()

			vm.update = function() {
				$http.post(api_url+'admin/updateSettings', {
					name: vm.organisation.name,
					address: vm.organisation.address,
					city: vm.organisation.city,
					phone: vm.organisation.phone,
					loanInterestRate: vm.organisation.loanInterestRate,
					emergencyLoanInterestRate: vm.organisation.emergencyLoanInterestRate
				}).then(function (res) {
					 toastr.success('Updated successfully', 'Settings')
				}).catch(function (err) {
					vm.error = err.data.message
				})
			}
		})
}());