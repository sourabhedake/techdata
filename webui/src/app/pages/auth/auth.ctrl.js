(function () {
	'use strict';

	angular.module('TechData.pages.auth')
		.controller('loginCtrl', function (localStorage, $state, $http, api_url) {
			var vm = this;

			localStorage.clear('authToken');
			localStorage.clear('client');

			vm.login = function () {
				$http.post(api_url + 'auth/signIn', {
					userName: vm.user,
					password: vm.password
				}).then(function (res) {
					localStorage.set('authToken', res.data.authToken);
					if (res.data.client) {
						$state.go('client');
						localStorage.set('client', true);
					} else {
						$state.go('main.dashboard');
						localStorage.set('client', false);
					}
				}).catch(function (err) {
					if (err.data && err.data.message) {
						vm.error = err.data.message
					} else {
						vm.error = "Cannot connect to server"
					}
				})
			};

			vm.forgotPassword = function () {
				$state.go('auth.resetPassword')
			}
		})
		.controller('resetCtrl', function ($state, $http, toastr, api_url) {
			var vm = this;
			vm.getOTP = function () {
				$http.post(api_url + 'auth/getOTP', {
					userName: vm.user
				}).then(function (res) {
					toastr.success(res.data.message, 'Reset Password');
				}).catch(function (err) {
					toastr.error(err.data.message, 'Reset Password');
				})
			}

			vm.resetPassword = function () {
				if (!vm.password) {
					toastr.error('Passwords cannot be empty', 'Reset Password');
					return;
				}
				if (vm.password != vm.confirmPassword) {
					toastr.error('Passwords don\'t match', 'Reset Password');
					return;
				}
				if (!vm.otp) {
					toastr.error('Click Get OTP to generate OTP', 'OTP is empty');
					return;
				}
				$http.post(api_url + 'auth/resetPassword', {
					userName: vm.user,
					password: vm.password,
					otp: vm.otp
				}).then(function (res) {
					toastr.success(res.data.message, 'Reset Password');
					$state.go('auth.login');
				}).catch(function (err) {
					if (err.data && err.data.message) {
						toastr.error(err.data.message, 'Reset Password');
					} else {
						toastr.error('Unknown error', 'Reset Password');
					}
				})
			}
		})
})();