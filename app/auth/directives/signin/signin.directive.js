(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * Signin Object/function
     */
    function Signin() {

        /***************** PRIVATE *******************/

        /* @ngInject */
        function SignInController($state, $timeout, authService, PubSub) {
            var vm = this;

            vm.model = {
                message: '',
                signin: {
                    userName: "",
                    password: "",
                    rememberMe: false
                }
            };
            
            vm.signinForm = null;

            function _clearErrors() {
                vm.model.message = '';
            }

            function _signIn(event) {
                event.preventDefault();
                _clearErrors();

                if(vm.signinForm.$invalid){
                    vm.model.message = "אנא מלאו שם משתמש וסיסמא ונסו שנית";
                    return;
                }

                authService.login(vm.model.signin)
                    .then(function (response) {
                        // change state only if login successful
                        if(response && response.status === 200){
                            $state.go('shell.home.dashboard');    
                        }
                     },
                     function (response) {
                         if (response && response.data && response.data.error_description) {
                             PubSub.publish('message-show', { 'msg': response.data.error_description });
                         } else {
                             PubSub.publish('message-show', { 'msg': 'אין תקשורת - נא בדקו חיבור לרשת' });
                         }
                     });

            }

            /*** PUBLIC ***/
            vm.signIn = _signIn;

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
            templateUrl: 'auth/directives/signin/signin.directive.html',
            link: _link,
            controller: SignInController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('auth')
        .directive('signin', Signin);

})();
