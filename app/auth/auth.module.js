(function () {
    'use strict';

    // CREATE module
    angular
        .module('auth', ['common']);


    // Module's CONFIG

        angular
            .module('auth')
            .config(function ($stateProvider) {

                $stateProvider
                    .state('shell.auth', {
                        url: '/auth',
                        views: {
                            'shellNavView': {
                                template: '<div></div>'
                            },
                            'shellContentView': {
                                template: '<auth-container></auth-container>'
                            }
                        }
                    })
                    .state('shell.auth.signup', {
                        url: '/signup',
                        views: {
                            'shellContentView@shell': {
                                template: '<signup></signup>'
                            }
                        }
                    })
                    .state('shell.auth.signin', {
                        url: '/signin',
                        views: {
                            'shellContentView@shell': {
                                template: '<signin></signin>'
                            }
                        }
                    });
                /* Add New States Above */

            });

})();
