(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeWizardContent Object/function
     */
    function MoeWizardContent() {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }

        function MoeWizardContentController($log, $scope,$q, ENV) {
            $log = $log.getInstance('MoeWizardContentController', true);
            $log.debug("load()");

            var vm = this;
           function _loadSchemaList(){
                if (vm.model.step.stepListSchema) {
                    vm.setListSchema()(ENV.dataEndpoint + vm.model.step.stepListSchema).then(function (data) {
                        vm.listSchema = data;
                    });
                }

            }
           _loadSchemaList();

            function _loadForm(schemaUrl) {
                $log.debug("_loadForm()");
                var deferred = $q.defer();
                vm.setFormSchema()(ENV.dataEndpoint + schemaUrl).then(function (data) {
                    deferred.resolve(data);
                },
                     function error(err) {
                         $log.debug(err);
                         deferred.reject(err);
                     });
                return deferred.promise;
            }

            function _loadForms() {
                $log.debug("_loadForms()");
                var deferred = $q.defer();
                var promises = [];
                angular.forEach(vm.model.step.stepForm, function (item) {
                    var promise = _loadForm(item);
                    promises.push(promise);
                });
                $q.all(promises).then(
                    function success(data) {
                        $log.debug("success");
                        deferred.resolve(data);
                    },
                    function error(err) {
                        $log.debug(err);
                        deferred.reject(err);
                    });
                return deferred.promise;
            }

            if (vm.model.step.stepForm) {
                if (_.isArray(vm.model.step.stepForm)) {
                    _loadForms().then(function (data) {
                        vm.formSchema = data;

                    });
                }
                else {
                    _loadForm(vm.model.step.stepForm).then(function (data) {
                        vm.formSchema = data;
                    });
                    
                }
            }

        }
        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {
                model: '=',
                listOptions: '=?',
                setListSchema: '=?',
                setFormSchema: '=?',
                submitEvent: '&',
                saveEvent: '&'
            },
            templateUrl: 'common/directives/moe-wizard-content/moe-wizard-content.directive.html',
            link: _link,
            controller: MoeWizardContentController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('moeWizardContent', MoeWizardContent);

})();
