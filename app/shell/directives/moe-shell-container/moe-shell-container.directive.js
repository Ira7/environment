(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeShellContainer Object/function
     */
    function MoeShellContainer () {

        /***************** PRIVATE *******************/

   
        function MoeShellContainerController($log, $state, moeLoadMetaData)
        {
            $log = $log.getInstance('MoeShellContainerController', true);
            $log.debug("load()");
            var vm = this;
        
            function _init() {
                moeLoadMetaData.loadMetaData()
                         .then(function success(result) {
                             // OK - go to desktop state, otherwise stay here.
                             if (result !== null) {
                                 if ($state.current.name === "shell") {
                                     // state go to first state...otherwise stay here....
                                     $state.go('shell.sites');
                                    
                                 }

                             }

                         });
            }

            /****************** PUBLIC *******************/
            vm.model = moeLoadMetaData.Model;

        _init();
        }

        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'shell/directives/moe-shell-container/moe-shell-container.directive.html',
            controller: MoeShellContainerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('shell')
        .directive('moeShellContainer', MoeShellContainer );

})();
