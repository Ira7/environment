(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeTestWs Object/function
     */
    function MoeTestWs() {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }

        function MoeTestWsController($scope, dataService) {
            var vm = this;
            var _model = {
                request: "lookups/WeightMeasurement/",
                data: null
            };

            function _run() {

                var url = '/api/v1/' + _model.request;

                dataService.get(url)
                    .then(function success(data) {
                        _model.data = data;
                    }, function error(err) {
                        _model.data = null;
                    });
            }

            // Public
            vm.model = _model;
            vm.run = _run;
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {

            },
            templateUrl: 'common/directives/moe-test-ws/moe-test-ws.directive.html',
            link: _link,
            controller: MoeTestWsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('moeTestWs', MoeTestWs);

})();
