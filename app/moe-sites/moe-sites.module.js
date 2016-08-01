(function () {
    'use strict';

    // CREATE module
        angular
            .module('moeSites', ['common']);

    // Module's CONFIG
        angular
            .module('moeSites')
            .config(function ($stateProvider) {
                $stateProvider.state('shell.sites', {
                    url: '/sites',
                    views: {
                        'shellNavView': {
                            template: '<nav-private></nav-private>'
                        },
                        'shellSideView': {
                            template: '<sidenav></sidenav>'
                        },
                        'shellHeaderView': {
                            template: '<moe-header-sites></moe-header-sites>'
                        },
                        'shellContentView': {
                            template: '<moe-sites></moe-sites>' //set-permit-num="vm.onSetPermitSite  list="vm.model.SitesList.Permit" schema="vm.sitesSchema""
                        }
                    }
                });
                

                /* Add New States Above */

            }); 

})();
