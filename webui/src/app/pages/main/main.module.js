(function () {
	'use strict';
	angular.module('TechData.pages.main', [])
		.config(function ($stateProvider) {
			$stateProvider
				.state('main', {
					url: '/main',
					templateUrl: 'app/pages/main/main.html',
					redirectTo: 'main.dashboard'
				})
				.state('client', {
					url: '/client',
					templateUrl: 'app/pages/client/client.html',
					redirectTo: 'client.dashboard'
				});
		});
})();