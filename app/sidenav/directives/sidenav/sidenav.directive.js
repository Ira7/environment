(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * Sidenav Object/function
     */
    function Sidenav () {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {

            },
            templateUrl: 'sidenav/directives/sidenav/sidenav.directive.html',
            link: _link
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('sidenav')
        .directive('sidenav', Sidenav );

})();
