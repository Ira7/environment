(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeList Object/function
     */
    function MoeList() {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
        //    if (angular.isUndefined(scope.vm.isSaveForm)) {
        //        scope.vm.isSaveForm = true;
        //}
        }
        function MoeListController($log, $state , moeDialog) { //moeToasterServicetoaster

            $log = $log.getInstance('MoeListController', true);
            $log.debug("load()");

            var vm = this;
            function _save() {
                vm.saveDataForm().then(function success(data) {
                    $log.debug("save.success()", data);
                }, function error(err) {
                    $log.error("save.error()", err);
                });
            }

           function _edit(item,index) {

                var data = {
                    schema: vm.schemaForm,
                    item: item,
                    title: vm.title
                    //defaultValue: vm.defaultValue
                  //  saveDataForm: vm.saveDataForm,
                  //  isSaveForm: vm.isSaveForm
                };
            
                var oldItem = angular.copy(item);
             
                moeDialog.showDialogFormTemplate('moe-dialog/templates/dialogForm.tpl.html', data, 'moeForm-dialog-theme-plain')
                    .then(function (result) {
                        if (!_.isNull(result.value) && (result.value !==false)) { //&& result.value.form.$dirty
                            //var index = vm.data[vm.key].indexOf(item);
                            //vm.data[vm.key][index] = result.value.item; 
                            // TODO: Handle different results from dialog...
                            if (vm.optionsList.isSave) {
                                _save();
                            }
                        }
                        else if (result.value === false) {
                            vm.data[vm.key][index] = oldItem; //angular.copy(oldItem);
                        }

                    });
            }

          

           function _deleteItem(item) {
               var data = {
                   title: "מחיקה",
                    message: "האם למחוק פריט זה לצמיתות?"
                };
                moeDialog.showConfirmDialog(data).then(function (result) {
                    if (result.value === true) // yes
                    {
                        var indexOfList = vm.data[vm.key].indexOf(item);
                        vm.data[vm.key].splice(indexOfList, 1);
                     
                        if (vm.data[vm.key] && vm.data[vm.key].length === 0) {
                            vm.data[vm.key] = null;
                        }
                        if (vm.optionsList.isSave) {
                            _save();
                        }
                    }

                });
           }
          


           function _addNewItem() {
                var data = {
                    schema: vm.schemaForm,
                    item: null,
                    title: vm.title
                   // defaultValue: vm.defaultValue
                   // saveDataForm: vm.saveDataForm,
                  //  isSaveForm: vm.isSaveForm
                };
                vm.test = "dd";
                 moeDialog.showDialogFormTemplate('moe-dialog/templates/dialogForm.tpl.html', data, 'moeForm-dialog-theme-plain')                    
                    .then(function (data) {
                        if (data.value) {// TODO: handle case is data is null -->  _.isNull(
                            if (!vm.data[vm.key] && vm.key) {
                                vm.data[vm.key] = [];
                            }
                            vm.data[vm.key].push(data.value);
                            //  if (vm.isSaveForm) {
                            if (vm.optionsList.isSave) {
                                _save();
                            }
                        }
                   
                    });

           }
            /****************** PUBLIC *******************/

            vm.edit = _edit;
            vm.addNewItem = _addNewItem;
            vm.deleteItem = _deleteItem;
        }

        var directive = {
            restrict: 'E',
            scope: {
                schemaList: '=',
                optionsList: '=',
                key: '=',
                data: '=',
                schemaForm: '=?',
                title:'=?',
                saveDataForm: '&'
              //  isSaveForm: '=?',
            },
            templateUrl: 'common/directives/moe-list/moe-list.directive.html',
            link: _link,
            controller: MoeListController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('moeList', MoeList);

})();
