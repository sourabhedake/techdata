/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('TechData.theme.components')
      .directive('pageTop', pageTop);

  function pageTop() {
    var controller = ["localStorage", function (localStorage) {
      var vm = this;
      vm.lang = 0;
      localStorage.set("lang", 0);
      vm.updateLang = function () {
        localStorage.set("lang", vm.lang);
      };
    }];

    return {
      restrict: 'E',
      controller: controller,
      controllerAs: 'ctrl',
      templateUrl: 'app/theme/components/pageTop/pageTop.html'
    };
  }

})();