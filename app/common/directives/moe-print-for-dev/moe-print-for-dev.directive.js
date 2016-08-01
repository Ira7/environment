(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoePrintForDev Object/function
     */
    function MoePrintForDev () {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }
        function MoePrintForDevController() {
            var vm = this;
         
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',   
            scope: {
                isShow: '=',
                data: '='
            },
            templateUrl: 'common/directives/moe-print-for-dev/moe-print-for-dev.directive.html',
            link: _link,
            controller: MoePrintForDevController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('moePrintForDev', MoePrintForDev );

})();
