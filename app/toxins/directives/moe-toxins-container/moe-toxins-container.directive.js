(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeToxinscontainer Object/function
     */
    function MoeToxinscontainer($log) {

        $log = $log.getInstance('MoeToxinscontainer', true);
        $log.debug("load()");


        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            $log.debug("link()");
            //scope.$watch('vm.model.steps', function (newVal) {
            //    if (newVal) { iElem.text(scope.vm.steps); }
            //}, true);
        }


        function MoeToxinsContainerController($log,$scope, toxinsService, ENV) {
            $log = $log.getInstance('MoeToxinsContainerController', true);
            $log.debug("load()");

            var vm = this;
            toxinsService.init();
            vm.model = toxinsService.model;   
            vm.onloadForm = toxinsService.loadDataByURL;
            vm.onLoadSchemaList = toxinsService.loadDataByURL;
            //vm.onGetKeyList = toxinsService.getListKey;      
          //  vm.onSaveData = toxinsService.saveDraft;
            vm.onSetPermitSite = toxinsService.loadSitePermit;
            vm.onSubmited = toxinsService.submit;
            vm.onGetDraft = toxinsService.getDraft;
            vm.onSave = toxinsService.saveDraft;
            vm.setStep = function (step) {
                toxinsService.setStep(step);
            };

         

            // TODO: check if is right based on includes('form') and use names: general\submit
            /* displayFooter : return false when the current state is form apart from step name = general and submit */
            vm.displayFooter = function (currentState, currentStepName) {
                $log.info("displayFooter()");
                if (currentState.includes('form') && (currentStepName !== 'general' && currentStepName !== 'submit'))
                { return false; }
                else
                { return true; }
            };
            //vm.$watch('vm.model.steps', function (newVal) {
            //    if (newVal) { iElem.text(scope.vm.steps); }
            //}, true);
            var listener = $scope.$watch('vm.model.steps', function (newVal, old) {
                $log.debug(newVal, old);
                if (!(_.isNull(vm.model.steps))) {
                    listener();
                }
               
            });

            //var listeneData = $scope.$watch('vm.model.permitData', function (newVal, old) {
            //    $log.debug(newVal, old);
            //    console.log('chaged!!!!');
            //    toxinsService.saveDraft();

            //});
            
             
            $scope.$on(
                "$destroy",
                function _destroy() {
                   // toxinsService.stopSave();
                  //  listeneData();
                }
                );
         
            //var formName = 'material';
            //toxinsService.loadData(formName);
        }
        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {

            },
            templateUrl: 'toxins/directives/moe-toxins-container/moe-toxins-container.directive.html',
            link: _link,
            controller: MoeToxinsContainerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('toxins')
        .directive('moeToxinsContainer', MoeToxinscontainer);

})();
