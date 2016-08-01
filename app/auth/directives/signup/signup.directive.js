(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * Signup Object/function
     */
    function Signup () {

        /***************** PRIVATE *******************/

        function SignUpController($state, $timeout, authService) {
            var vm = this;

            vm.model = {
                savedSuccessfully: false,
                message: '',
                registration: {
                    firstName: "",
                    lastName: "",
                    identityNumber: "",
                    phoneNumber: "",
                    userName: "",
                    email :"",
                    password: "",
                    confirmPassword: ""
                }
            };

            function _clearErrors() {
                vm.message = '';
            }
            function startTimer() {
                var timer = $timeout(function () {
                    $timeout.cancel(timer);
                    $state.go('shell.auth.signin');
                }, 2000);
            }


            function _signUp() {

                _clearErrors();

                authService.saveRegistration(vm.model.registration).then(function (response) {

                    vm.model.savedSuccessfully = true;
                    vm.model.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                    startTimer();

                },
                 function (response) {
                     var errors = [];
                     if (response.data.ModelState) {
                         for (var key in response.data.ModelState) {
                             for (var i = 0; i < response.data.ModelState[key].length; i++) {
                                 errors.push(response.data.ModelState[key][i]);
                             }
                         }
                         vm.model.message = "Failed to register user due to:" + errors.join(' ');
                     } else {
                         vm.model.message = "Sign Up Failed.";
                     }
                     
                 });
            }


            /*** PUBLIC ***/
            vm.signUp = _signUp;

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
            templateUrl: 'auth/directives/signup/signup.directive.html',
            link: _link,
            controller: SignUpController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('auth')
        .directive('signup', Signup );

})();
