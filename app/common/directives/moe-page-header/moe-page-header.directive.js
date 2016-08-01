(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * PageHeader Object/function
     */
    function MoePageHeader ($log) {

        $log = $log.getInstance('PageHeader', true);
        $log.debug("load()");
        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }
        
        function PageHeaderController($log){
            $log = $log.getInstance('PageHeaderController', true);
            $log.debug("load()");
            var vm = this;
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {
                model: '=',
                schema: '='
            },
            templateUrl: 'common/directives/moe-page-header/moe-page-header.directive.html',
            link: _link,
            controller: PageHeaderController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('moePageHeader', MoePageHeader );

})();
