(function () {
    'use strict';

    angular
        .module('shell', ['common']);

    angular
        .module('shell')
        .config(function ($stateProvider) {

            //$stateProvider.state('shell', {
            //    url: '/shell',
            //    abstract: true,
            //    views: {
            //        'shellView': {
            //            template: '<moe-shell-container></moe-shell-container>'
            //        }
            //    }
            //})
            $stateProvider.state('shell', {
                url: '',
                views: {
                    '': {
                        template:'<moe-shell-container></moe-shell-container>'   
                    }   
                }
            });
         
            /* Add New States Above */

        });
})();
