(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeHeaderSites Object/function
     */
    function MoeHeaderSites () {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }

        function MoeHeaderSitesController($log, moeSitesService) {
            $log = $log.getInstance('MoeHeaderSitesController', true);
            $log.debug("load()");
            var vm = this;
            //TODO: genery directive
            vm.model = moeSitesService.model;
            if (vm.model.sites) {
                vm.headerName = vm.model.sites.LegalEntityName;
                vm.headerNumber = vm.model.sites.LegalEntityNumber;
            }
           
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl: 'moe-sites/directives/moe-header-sites/moe-header-sites.directive.html',
            link: _link,
            controller: MoeHeaderSitesController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('moeSites')
        .directive('moeHeaderSites', MoeHeaderSites );

})();
