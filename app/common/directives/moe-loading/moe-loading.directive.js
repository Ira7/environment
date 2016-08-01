(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeLoading Object/function
     */
    function MoeLoading () {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }
        function MoeLoadingController($log) {

            $log = $log.getInstance('MoeLoadingController', true);
            $log.debug("load()");
       
           

        }
        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {
                loading: '='
            },
            templateUrl: 'common/directives/moe-loading/moe-loading.directive.html',
            link: _link,
            controller: MoeLoadingController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('moeLoading', MoeLoading );

})();
