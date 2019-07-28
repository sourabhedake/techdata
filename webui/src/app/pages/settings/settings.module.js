(function () {
    'strict'
    angular.module('TechData.pages.settings', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('main.settings', {
                    url: '/settings',
                    templateUrl: 'app/pages/settings/settings.html',
                    title: 'Settings',
                    controller: 'settingsCtrl',
                    controllerAs: 'ctrl'
                })
        })
}());