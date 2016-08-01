(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * AuthContainer Object/function
     */
    function AuthContainer () {

        /***************** PRIVATE *******************/

        function AuthController(authService) {

            function _logOut() {
                authService.logOut();
            }

            // init
            _logOut();

        }

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
            templateUrl: 'auth/directives/auth-container/auth-container.directive.html',
            link: _link,
            controller: AuthController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('auth')
        .directive('authContainer', AuthContainer );

})();
