(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeWizard Object/function
     */
    function MoeWizard($log) {

        $log = $log.getInstance('MoeWizard', true);
        $log.debug("load()");

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }

        function MoeWizardController($log, $rootScope, $scope, $state , PubSub,toxinsService) {

            $log = $log.getInstance('MoeWizardController', true);
            $log.debug("load()");

            var vm = this;

            /**
             * moveToStep - move to step
             */
            function _moveToStep(step) {
                if (step) {
                    vm.model.step = step;
                    //TODO check if need to move vm.model.step to onSetStep
                    vm.onSetStep()(step);
                    vm.saveDataWithParam()(false);
                    $state.go(step.stateName, step.stateParams);

                }
            }


            //vm.loadFormByStep = vm.loadFormByStep;
            /**
             * moveTo() - move to step by Index
             */
            function _moveTo(stepIndex) {
                if (vm.model.steps && vm.model.steps.length > 0) {

                    var step = _.find(vm.steps,
                        function (step) {
                            return step.stepIndex === stepIndex;
                        });

                    if (step) {
                        vm.model.step = step;
                        $state.go($state.current.name, step.stateParams);//{ "stepName": step.stepName }
                    }

                }
            }

            /**
             * moveToName() - move to step by stepName
             */
            function _moveToName(stepName) {
                if (vm.model.steps && vm.model.steps.length > 0) {

                    var step = _.find(vm.model.steps,
                        function (step) {
                            return step.stepName === stepName;
                        });

                    if (step) {
                        vm.onSetStep()(step);
                        $state.go(step.stateName, step.stateParams); //{ "stepName": step.stepName }
                    }

                }
            }

            function _isStepFirst() {
                var firstStep = _.head(vm.model.steps);
                return firstStep.stepName;
            }
            function _isStepLast() {
                var lastStep = _.last(vm.model.steps);
                return lastStep.stepName;
            }

            /**
             * moveNext() - move to next wizard step
             */
            function _moveNext(stepName) {
                if (vm.model.steps && vm.model.steps.length > 0) {
                    var step = _.find(vm.model.steps, function (step) { return step.stepName === stepName; });
                    var indexOfStep = vm.model.steps.indexOf(step);
                    var nextStep = vm.model.steps[indexOfStep + 1];
                    if (nextStep) {
                        vm.onSetStep()(nextStep);
                        vm.saveDataWithParam()(false);
                        $state.go(nextStep.stateName, nextStep.stateParams); //{ "stepName": step.stepName }
                    }
                }


            }

            /**
             * movePrev() - move to previous wizard step
             */
            function _movePrev(stepName) {
                if (vm.model.steps && vm.model.steps.length > 0) {
                    var step = _.find(vm.model.steps, function (step) { return step.stepName === stepName; });
                    var indexOfStep = vm.model.steps.indexOf(step);
                    var prevStep = vm.model.steps[indexOfStep - 1];
                    if (prevStep) {
                        vm.onSetStep()(prevStep);
                        $state.go(prevStep.stateName, prevStep.stateParams); //{ "stepName": step.stepName }
                    }
                }
            }
            if (vm.model.step){
                vm.isDisplay = function () {
                    return vm.isDisplayFooter()($state.current.name, vm.model.step.stepName);
                };
            }

            /**
             * init() - get the Wizard component
             */
            function _init() {
                _moveToName($state.params["stepName"]);

            }

            /* Register to ui-router event */
            var stateSuccessEvent =
                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams) {

                        $log.info("toState = ", toState);
                        $log.info("toParams = ", toParams);

                        //TODO should not be global var ? 
                        if (toState.name === "shell.toxins.permit.step") {
                            _moveToName(toParams.stepName);
                        }

                        // event.preventDefault(); 
                        // transitionTo() promise will be rejected with 
                        // a 'transition prevented' error
                    });



            PubSub.subscribe('onStateChanged', function (event, data) {
                _moveToName(data.stateName);
            });
      
            /* Unregister Events, References to HTML... */
            $scope.$on(
                "$destroy",
                function _destroy() {
                    stateSuccessEvent();
                });


            // init
            _init();

            /* PUBLIC */
            vm.init = _init;
            vm.moveTo = _moveTo;
            vm.moveNext = _moveNext;
            vm.movePrev = _movePrev;
            vm.moveToStep = _moveToStep;
            vm.isStepFirst = _isStepFirst;
            vm.isStepLast = _isStepLast;
           
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {
                model: '=',
                onSetStep: '&',
                loadform: '&',
                loadListSchema: '&',
                getListKey: '&',
                isDisplayFooter: '&',
                submitData: '&',
                saveData: '&',
                saveDataWithParam:'&'
            },
            templateUrl: 'common/directives/moe-wizard/moe-wizard.directive.html',
            link: _link,
            controller: MoeWizardController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('moeWizard', MoeWizard);

})();
