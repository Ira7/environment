
(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeWizardSteps Object/function
     */
    function MoeWizardSteps($log) {

        $log = $log.getInstance('MoeWizardSteps', true);
        $log.debug("load()");

        /***************** PRIVATE *******************/

        function MoeWizardStepsController($log, $scope) {

            $log = $log.getInstance('MoeWizardStepsController', true);
            $log.debug("load()");

            var vm = this;
            
            vm.stepSelected = function (step){
                vm.onStepSelected()(step);
            };
            //var listener = $scope.$watch('vm.isValid', function (newVal, old) {
            //    $log.debug(newVal, old);

            //    console.log(" isValid-newVal    " + newVal + "      isValid-old    " + old);
            //    vm.isValid = newVal;
                //if (!(_.isNull(vm.model.steps))) {
                //    listener();
                //}

         //   });
            
        }

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            var s = scope;
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {
                steps: '=',
                step: '=',
             //   isValid: '=',
                onStepSelected: '&'
            },
            templateUrl: 'common/directives/moe-wizard-steps/moe-wizard-steps.directive.html',
            link: _link,
            controller: MoeWizardStepsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('moeWizardSteps', MoeWizardSteps);

})();

