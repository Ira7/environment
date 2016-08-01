(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeFooter Object/function
     */
    function MoeWizardFooter() {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }
        function MoeWizardFooterController($log,PubSub ) {

            $log = $log.getInstance('MoeWizardFooterController', true);
            $log.debug("load()");

            var vm = this;

           function _stepNext(step) {
                vm.onMoveNextStep()(step);
            }
            
            function _stepPrev(step) {
                vm.onMovePrevStep()(step);
            }

            function _isFirst() {
                return vm.isFirstStep();
            }

           function _isLast() {
                return vm.isLastStep();
           }

            /****************** PUBLIC *******************/

           vm.isLast = _isLast;
           vm.stepNext = _stepNext;
           vm.isFirst = _isFirst;
           vm.stepPrev = _stepPrev;
        
        }

        var directive = {
            restrict: 'E',
            scope: {
                step: '=',
                steps: '=',
                onMoveNextStep: '&',
                onMovePrevStep: '&',
                isFirstStep: '&',
                isLastStep: '&',
                isValid:'='
            },
            templateUrl: 'common/directives/moe-wizard-footer/moe-wizard-footer.directive.html',
            link: _link,
            controller: MoeWizardFooterController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('moeWizardFooter', MoeWizardFooter);

})();
