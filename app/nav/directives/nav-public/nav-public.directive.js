(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * NavPublic Object/function
     */
    function NavPublic ($log) {
        $log = $log.getInstance('NavPublic', true);
        $log.debug("load()");
        
        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            $log.debug("link()");
            // add logic here
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {

            },
            templateUrl: 'nav/directives/nav-public/nav-public.directive.html',
            link: _link
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('nav')
        .directive('navPublic', NavPublic );

})();
