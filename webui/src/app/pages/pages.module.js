(function () {
	'use strict';

	angular.module('TechData.pages', [
			'ui.router',
			'TechData.pages.services',
			'TechData.pages.main',
			'TechData.pages.dashboard',
			'TechData.pages.auth',
			'TechData.pages.profile',
			'TechData.pages.settings',
			'TechData.pages.client.dashboard'
		])
		.config(function ($urlRouterProvider) {
			$urlRouterProvider.otherwise('/login');
		});
})();
