(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeForm Object/function
     */
    function MoeForm() {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            scope.vm.isFunction = angular.isUndefined(iAttrs.optionalFunction) === false;
            //if (angular.isUndefined(scope.vm.isSave)) {
            //    scope.vm.isSave = true;
            //}
            if (angular.isUndefined(scope.vm.showButtons)) {
                scope.vm.showButtons = true;
            }
        }

        /* @ngInject */
        function MoeFormController($log, $scope, moeDialog) {

            $log = $log.getInstance('MoeFormController', true);
            $log.debug("load()");         
          
            var vm = this;
            vm.options = {};   
            function onSubmit() {
                if (vm.form.$valid) {
                    if (vm.isFunction) {
                       vm.optionalFunction()(vm.formData);                    
                   }
                }
               
            }
            function _onCancel() {

                if (vm.form.$dirty) {
                    var data = {
                        message: "הנתונים לא יישמרו האם אתה ברצונך לצאת?"
                    };
                    moeDialog.showConfirmDialog(data).then(function (result) {
                        if (result.value === true) // yes
                        {
                           // vm.options.resetModel();
                            if (vm.isFunction) {
                                vm.optionalFunction()(false);
                            }
                        }
                    });
                }
                else if (!vm.form.$dirty) {
                    if (vm.isFunction) {
                        vm.optionalFunction()(false);
                    }

                }
             
            }
            //var listener = $scope.$watch('vm.form.$valid', function (newVal, old) {
            //    $log.debug(newVal, old);
            //    vm.validForm = newVal;
            //    console.log("validForm-newVal  " + newVal );
             //    //if (!(_.isNull(vm.model.steps))) {
            //    //    listener();
            //    //}

            //});
            if (vm.form){
                vm.validForm = vm.form;
            }

            /* Public */
            vm.onSubmit = onSubmit;
            vm.onCancel = _onCancel;
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {
                formSchema: '=',
                formData: '=',
                optionalFunction: '&',
                showButtons: '=?',
                className:'@?'
            },
            templateUrl: 'moe-form/directives/moe-form/moe-form.directive.html',
            link: _link,
            controller: MoeFormController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('moeForm')
        .directive('moeForm', MoeForm);

})();
