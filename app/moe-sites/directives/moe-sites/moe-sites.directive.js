(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeSites Object/function
     */
    function MoeSites() {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {

        }
        function MoeSitesController($log, $state, moeSitesService) {
            $log = $log.getInstance('MoeSitesController', true);
            $log.debug("load()");

            var vm = this;
            vm.model = moeSitesService.model;
            if (vm.model.sites){
                vm.list = vm.model.sites.Permit;
                moeSitesService.parseStatus();
            }

            function _changState(site) {          
                $log.debug("changState()", site);
                if (site.PermitStatus !==1) {
                    moeSitesService.loadSitePermit(site);    
            }
            }



            /****************** PUBLIC *******************/
        
            vm.changState = _changState;
        }

        var directive = {
            restrict: 'E',
            scope: {
                isDisable:'='
                //list: '=',
                //setPermitNum: '&',
                //schema:'='
            },
            templateUrl: 'moe-sites/directives/moe-sites/moe-sites.directive.html',
            link: _link,
            controller: MoeSitesController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('moeSites')
        .directive('moeSites', MoeSites);

})();
