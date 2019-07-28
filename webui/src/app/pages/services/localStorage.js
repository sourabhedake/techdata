(function () {
	'use strict';

	angular.module('TechData.pages.services')
		.factory('localStorage', localStorageProvider)

		/** @ngInject */
		function localStorageProvider($window) {
			return {
				set: function (key, value) {
					$window.localStorage.setItem(key, angular.toJson(value))
				},
				get: function (key) {
					if (!$window.localStorage.getItem(key) || $window.localStorage.getItem(key) == "undefined" ){
						$window.localStorage.removeItem(key)
						return "";
					}
					return angular.fromJson($window.localStorage.getItem(key))
				},
				clear: function (key) {
					return $window.localStorage.removeItem(key)
				}
			}
		}
})();