(function () {
	'use strict';

	angular.module('TechData.pages.auth', [])
		.config(function ($stateProvider) {
			$stateProvider
				.state('auth', {
					abstract: true,
					title: 'Login',
					templateUrl: 'app/pages/parent.html',
					sidebarMeta: {
						order: 2,
					}
				})
				.state('auth.login', {
					url: '/login',
					templateUrl: 'app/pages/auth/login.html',
					controller: 'loginCtrl',
					public: true
				})
				.state('auth.resetPassword', {
					url: '/resetPassword',
					templateUrl: 'app/pages/auth/resetPassword.html',
					controller: 'resetCtrl',
					public: true
				})
		});
})();