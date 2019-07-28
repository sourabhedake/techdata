(function () {
	'use strict';

	angular.module('TechData.pages.dashboard', [])
		.config(function ($stateProvider) {
			$stateProvider
				.state('main.dashboard', {
					url: '/dashboard',
					templateUrl: 'app/pages/dashboard/dashboard.html',
					title: 'Dashboard',
					sidebarMeta: {
						icon: 'ion-android-home',
						order: 0,
					}
				})
		});
})();