'use strict';

angular.module('TechData', [
	'ngAnimate',
	'ui.bootstrap',
	'ui.sortable',
	'ui.router',
	'ngTouch',
	'toastr',
	'smart-table',
	"xeditable",
	'ui.slimscroll',
	'angular-progress-button-styles',

	'TechData.theme',
	'TechData.pages'
]).run(function ($rootScope, localStorage, $location, $timeout) {
	$rootScope.showLoader = false;
	$rootScope.$on('$stateChangeStart', function (toState) {
		if (!toState.public && !localStorage.get('authToken')) {
			$timeout(function () {
				$location.path('/login');
			}, 0);
		}
	})
})
.factory('LoaderIcon', function ($rootScope) {
	return {
		show: function () {
			$rootScope.showLoader = true;
		},
		hide: function () {
			$rootScope.showLoader = false;
		}
	}
})
.factory('HttpInterceptorFactory', httpInterceptorProvider)
.config(function ($httpProvider) {
	$httpProvider.interceptors.push('HttpInterceptorFactory');
})
.constant('api_url', 'http://localhost:3000/');

/** @ngInject */
function httpInterceptorProvider(localStorage, $q, LoaderIcon) {
	var count = 0;
	return {
		request: function (config) {
			LoaderIcon.show();
			count++;
			if (localStorage.get('authToken')) {
				config.headers['auth-token'] = localStorage.get('authToken')
				for (var attr in config.data) {
					if (config.data[attr] === null) {
						config.data[attr] = undefined;
					}
				}
			}
			return config;
		},
		response: function (res) {
			count--;
			if(count === 0) {
				LoaderIcon.hide();
			}
			return res;
		},
		responseError: function (res) {
			count--;
			if(count === 0) {
				LoaderIcon.hide();
			}
			return $q.reject(res);
		}
	}
}


