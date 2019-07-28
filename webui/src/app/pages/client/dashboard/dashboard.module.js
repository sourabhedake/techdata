(function () {
	'use strict';

	angular.module('TechData.pages.client.dashboard', [])
		.config(function ($stateProvider) {
			$stateProvider
			.state('client.dashboard', {
				url: '/client/dashboard',
				templateUrl: 'app/pages/client/dashboard/dashboard.html',
				title: 'Dashboard',
				sidebarMeta: {
					icon: 'ion-android-home',
					order: 0,
				}
			})
		});
})();

