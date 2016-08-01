(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeSummary Object/function
     */
    function MoeSummary () {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }
        function MoeSummaryController($log, PubSub, moeDialog) {

            $log = $log.getInstance('MoeSummaryController', true);
            $log.debug("load()");
            var vm = this;
           //vm.listConfig = {
           //     isAdd: false,
           //     isEdit: false,
           //     isDelete: false,
           //     borderClass: 'moe-table-border'
           // };

            function _changeState(_stateName) {
                PubSub.publish('onStateChanged', { stateName: _stateName });
            }
            function _onClickSubmit() {
             
                    var data = {
                        title: "שים לב!",
                        message: "בעת שליחת הבקשה המערכת תינעל לעדכון פרטי בקשה",
                        cancel: "ביטול",
                        ok: "שלח בקשה"
                    };
                    moeDialog.showConfirmDialog(data).then(function success (result) {
                        $log.debug("showConfirmDialog", result);
                        if (result.value === true) {
                            vm.onSubmit()
                                .then(function success(data) {
                                    $log.debug("onSubmit", data);

                                    vm.dataTest = data.validateBody;
                                    //if (data.isValid === true) {
                                    //    vm.disableButton = true;
                                    //}
                                  
                               
                            }, function error(err) {
                                $log.error("onSubmit", err);
                            });
                        }

                    });
                
            }


                /*********** PUBLIC ***********/
                vm.changeState = _changeState;
                vm.onClickSubmit = _onClickSubmit;
        }

        var directive = {
            restrict: 'E',
            scope: {
                data: '=',
                isDisableButton:'=?',
                schema: '=',
                summaryTemplate: '=',
                onSubmit: '&'
            },
            templateUrl: 'common/directives/moe-summary/moe-summary.directive.html',
            link: _link,
            controller: MoeSummaryController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('moeSummary', MoeSummary );

})();
