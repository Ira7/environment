(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
    * MessagePanel
     */
    function MessagePanel() {

        /***************** PRIVATE *******************/

        /* @ngInject */
        function MessagePanelController($log, messageService, $scope) {

            $log = $log.getInstance('MessagePanelController', true);
            $log.debug("load()");

            var vm = this;
            vm.name = "MessagePanelController";

            vm.model = messageService.model;
            vm.clear = messageService.clear;
          
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
                name:'@' 
            },
            templateUrl: 'common/directives/message-panel/message-panel.directive.html',
            link: _link,
            controller: MessagePanelController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('messagePanel', MessagePanel);

})();
