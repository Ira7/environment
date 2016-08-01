(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * NavPrivate Object/function
     */
    function NavPrivate ($log) {
        $log = $log.getInstance('NavPrivate', true);
        $log.debug("load()");

        var vm = this;
        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            $log.debug("link()");
            // add logic here
        }

        /* @ngInject */
        function NavPrivateController($log) {
            $log = $log.getInstance('NavPrivateController', true);
            $log.debug("load()");
            
            var vm = this;
        }


        
        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'nav/directives/nav-private/nav-private.directive.html',
            link: _link,
            controller: NavPrivateController,
            controllerAs: 'vm'

        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('nav')
        .directive('navPrivate', NavPrivate );

})();
