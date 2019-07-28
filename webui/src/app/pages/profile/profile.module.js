(function () {
    'strict'
    angular.module('TechData.pages.profile', [])
        .config(function ($stateProvider) {
            $stateProvider
                .state('main.profile', {
                    url: '/profile',
                    templateUrl: 'app/pages/profile/profile.html',
                    title: 'Profile',
                //     sidebarMeta: {
                //         icon: 'fa fa-user',
                //         order: 1,
                //     }
                });
        })
}());
