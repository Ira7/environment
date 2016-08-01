(function() {
    'use strict';
 
    // CREATE module
    angular
        .module('moeForm', ["common", 'formly', 'formlyBootstrap', 'ngMessages', 'ui.select']);
 
 
    // Module's CONFIG
    angular
        .module('moeForm')
        .config(function ($stateProvider, formlyConfigProvider, formlyApiCheck, ENV) {
 
            /* Add New States Above */
 
            /*TODO: Production - turn off debug settings */
            formlyConfigProvider.extras.removeChromeAutoComplete = false;
            formlyConfigProvider.disableWarnings = false;
 
            function camelize(string) {
                string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
                    return chr ? chr.toUpperCase() : '';
                });
                //TODO: Ensure 1st char is always lowercase
                return string.replace(/^([A-Z])/, function(match, chr) {
                    return chr ? chr.toLowerCase() : '';
                });
            }
 
            var ngModelAttrs = {};
 
            formlyConfigProvider.setWrapper([
                {
                    template: [
                        '<formly-transclude></formly-transclude>',
                        '<div class="validation"',
                        '  ng-if="showError"',
                        '  ng-messages="fc.$error">',
                        '  <div class="alert" ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages track by $index">',
                        '    {{message(fc.$viewValue, fc.$modelValue, this)}}',
                        '  </div>',
                        '</div>'
                    ].join(' ')
                }
            ]);
 
 
            /* formly templates */
            formlyConfigProvider.setWrapper({
                name: 'loading',
                templateUrl: 'moe-form/directives/moe-form/templates/moe-form-loading.tpl.html'
            });
 
            formlyConfigProvider.setType({
                name: 'datepicker',
                templateUrl: 'moe-form/directives/moe-form/templates/moe-form-datepicker.tpl.html',
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                defaultOptions: {
                    ngModelAttrs: ngModelAttrs,
                    templateOptions: {
                        datepickerOptions: {
                            format: 'dd/MM/yyyy',
                            initDate: new Date(),
                        }
                    }
                },
                controller: ['$scope', function($scope) {
                    $scope.datepicker = {};
                    $scope.datepicker.opened = false;
                    $scope.datepicker.open = function($event) {
                        $scope.datepicker.opened = true;
                    };
                }]
            });
 
            formlyConfigProvider.setType({
                name: 'moeAggregatorForms',
                template: '<div class="form-group" ng-class="{\'has-error\': showError}"><label for="{{id}}" class="control-label" ng-if="to.label" >{{to.label}} * </label>' +
                           '<moe-list id="{{id}}" name="{{id}}" ng-model="model[options.key]" schema-list="to.data" list="dataList"  schema-form="formSchema" data="model" key ="options.key" options-list="to.configOptions"></moe-list></div>',
                controller:/* @ngInject */function($log, $scope, $q, dataService) {
 
                 
                    $scope.$watch('model', function modelWatcher(newModelValue) {
                        var modelValue, valueProp;
 
                        if (Object.keys(newModelValue).length) {
                            modelValue = newModelValue[$scope.options.key];
                           
                        }
                    }, true);
                   
                    function checkValidity(expressionValue) {
                        var valid;
 
                        if ($scope.to.required) {
                            valid = angular.isArray($scope.model[$scope.options.key]) &&
                                $scope.model[$scope.options.key].length > 0 &&
                                expressionValue;
                            
                           // $scope.fc.$setTouched();
                            $scope.fc.$setValidity('required', valid);
                        }
                    }
 
                    if ($scope.options.expressionProperties && $scope.options.expressionProperties['templateOptions.required']) {
                        $scope.$watch(function() {
                            return $scope.to.required;
                        }, function(newValue) {
                            checkValidity(newValue);
                        });
                    }
 
                    if ($scope.to.required) {
                        var unwatchFormControl = $scope.$watch('fc', function (newValue) {
                            if (!newValue) {
                                return;
                            }
                            checkValidity(true);
                            unwatchFormControl();
                        });
                    }
 
                    function loadSchemaForm(formSchemaUrl) {
                        var defer = $q.defer();
                        dataService.get(formSchemaUrl)
                            .then(function success(data) {
                                $log.debug('loadSchemaForm', data);
                                $scope.formSchema = data;
                                defer.resolve(data);
                            }, function error(err) {
                                $log.error('loadSchemaForm', err);
                                $scope.formSchema = null;
                                defer.reject(err);
                            });
                        return defer.promise;
                    }
                    //init
                    loadSchemaForm(ENV.dataEndpoint+$scope.to.aggregatorFormSchemaUrl);
 
                }
            });
 
            formlyConfigProvider.setType({
                name: 'readFile',
                template: '<div ng-controller="GetContentController" class="container">' + '<div moe-read-file="showContent($fileContent)"></div></div>'
                //controller: ['$scope', function($scope) {
                //            $scope.to.showContent = function ($fileContent) {
                //                $scope.to.content = $fileContent;
                //                return $fileContent;
                //            };            
 
            });
 
            var attributes = [
                'date-disabled',
                'custom-class',
                'show-weeks',
                'starting-day',
                'init-date',
                'min-mode',
                'max-mode',
                'format-day',
                'format-month',
                'format-year',
                'format-day-header',
                'format-day-title',
                'format-month-title',
                'year-range',
                'shortcut-propagation',
                'datepicker-popup',
                'show-button-bar',
                'current-text',
                'clear-text',
                'close-text',
                'close-on-date-selection',
                'datepicker-append-to-body'
            ];
 
            var bindings = [
                'datepicker-mode',
                'min-date',
                'max-date'
            ];
 
 
            angular.forEach(attributes, function(attr) {
                ngModelAttrs[camelize(attr)] = { attribute: attr };
            });
 
            angular.forEach(bindings, function(binding) {
                ngModelAttrs[camelize(binding)] = { bound: binding };
            });
   
            formlyConfigProvider.setType({
                name: 'clear-value',
                extends: 'radio',
                controller:/* @ngInject */ function ($scope ) {

                    function clearTrueFields() {
                        if ($scope.to.clearTrueFields === undefined){ return;}
                           
                        if ($scope.to.clearTrueFields === null){ return;}
                           
                        if ($scope.to.clearTrueFields.length === 0){ return;}
                           
                        if (!$scope.model[$scope.options.key]){ return;}
                           
                            angular.forEach($scope.to.clearTrueFields, function (attr) {
                                //   $scope.model[attr.name]= null;
                                delete $scope.model[attr.name];
                                });
            }
                    function clearFalseFields() {
                        if ($scope.to.clearFalseFields === undefined){return;}
                            
                        if ($scope.to.clearFalseFields === null){  return;}
                          
                        if ($scope.to.clearFalseFields.length === 0){ return;}
                           
                        if ($scope.model[$scope.options.key]){ return;}
                           

                            angular.forEach($scope.to.clearFalseFields, function (attr) {
                                //  $scope.model[attr.name]= null;
                                delete $scope.model[attr.name];
                            });
                            }

                    function clearFields() {
                        if (!$scope.to.clearFalseFields && !$scope.to.clearTrueFields) {
                             return;
                        }
                        if ($scope.to.clearFalseFields == null && $scope.to.clearTrueFields == null) {
                            return;
                        }
                          
                        clearFalseFields();
                        clearTrueFields();

                    }
                    $scope.options.templateOptions.onChange = function ($scope) {
                        clearFields();
                    };
                }
            });

            formlyConfigProvider.setType({
                name: 'async-id-validator',
                extends: 'input',

                controller:/* @ngInject */ function ($scope, $timeout, moeLookupService) {
                    $scope.options.modelOptions = {};               
                    $scope.options.modelOptions['updateOn'] = 'blur';
                    $scope.options.templateOptions.onKeydown = function (value, options) {
                      
                        $scope.options.validation.show = false;
                    };
                    $scope.options.templateOptions.onBlur = function (value, options) {
                      
                        $scope.options.validation.show = null;
                    };
                    $scope.options.asyncValidators = {};
                    $scope.options.asyncValidators['validators'] = function ($viewValue, $modelValue, $scope) {

                        $scope.options.templateOptions.loading = true;
                        return $timeout(function () {
                            $scope.options.templateOptions.loading = false;
                            if ($scope.fc.$viewValue !== $scope.fc.$modelValue) {
                                delete $scope.model[$scope.to.dependensField];
                                if (!$scope.model[$scope.to.dependensField]) {
                                    var res = moeLookupService.getValueByID($scope.to.data.lookupName, $viewValue).then(function (data) {

                                        if (data == null) {

                                            delete $scope.model[$scope.to.dependensField];
                                            $scope.model[$scope.to.triggerField] = true;

                                        }
                                        else {
                                            var lookupName = $scope.to.data.lookupName;
                                            $scope.to.data = data;
                                            $scope.to.data.lookupName = lookupName;
                                            $scope.model[$scope.to.dependensField] = data[$scope.to.lookupAttrName];
                                            $scope.model[$scope.to.dependensFieldId] = data[$scope.to.lookupAttrId];
                                            $scope.model[$scope.to.triggerField] = false;
                                            return true;
                                        }
                                    });
                                }
                                else {
                                    delete $scope.model[$scope.to.dependensField];
                                    $scope.model[$scope.to.triggerField] = true;

                                }
                            }
                  
                        }, 1000);
                    };
                }
            });

             formlyConfigProvider.setType({
                name: '',
                extends: 'input',

                controller:/* @ngInject */ function ($scope, $timeout, moeLookupService) {
                    $scope.options.modelOptions = {};
                    $scope.options.modelOptions['updateOn'] = 'blur';
                    $scope.options.templateOptions.onKeydown = function (value, options) {
                        $scope.options.validation.show = false;
                    };
                    $scope.options.templateOptions.onBlur = function (value, options) {
                        $scope.options.validation.show = null;
                    };
                    $scope.options.asyncValidators = {};
                    $scope.options.asyncValidators['validators'] = function ($viewValue, $modelValue, $scope) {

                        $scope.options.templateOptions.loading = true;
                        return $timeout(function () {
                            $scope.options.templateOptions.loading = false;
                            if (!$scope.model[$scope.to.dependensField]) {
                                var res = moeLookupService.getValueByID($scope.to.data.lookupName, $viewValue).then(function (data) {

                                    if (data == null) {

                                      delete  $scope.model[$scope.to.dependensField];
                                        $scope.model[$scope.to.triggerField] = true;

                                    }
                                    else {
                                        $scope.to.data = data;
                                        $scope.model[$scope.to.dependensField] = data[$scope.to.lookupAttrName];
                                        $scope.model[$scope.to.dependensFieldId] = data[$scope.to.lookupAttrId];
                                        $scope.model[$scope.to.triggerField] = false;
                                        return true;
                                    }
                                });
                            }
                            else {
                               delete $scope.model[$scope.to.dependensField];
                                $scope.model[$scope.to.triggerField] = true;

                            }
                        }, 1000);
                    };
                }
            });
            /* UI Select */
 
            formlyConfigProvider.setType({
                name: 'ui-select-single',
                extends: 'select',
                templateUrl: 'moe-form/directives/moe-form/templates/moe-form-ui-select-single.tpl.html',
                controller: /* @ngInject */ function($scope, $sce, moeLookupService) {
                    if (moeLookupService.model[$scope.to.data.lookupName]) {
                        $scope.to.options = moeLookupService.model[$scope.to.data.lookupName];
                    }
                    else {
                        $scope.to.loading = moeLookupService.loadLookup($scope.to.data.lookupName).then(function (data) {
                            $scope.to.options = data;
                            return data;

                        });
                    }
 
                    $scope.trustAsHtml = function(html) {
                        return $sce.trustAsHtml(html);
                    };
 
                }
 
 
              
            });

            formlyConfigProvider.setType({
                name: 'ui-select-units',
                extends: 'select',
                templateUrl: 'moe-form/directives/moe-form/templates/moe-form-ui-select-single.tpl.html',
                controller: /* @ngInject */ function ($scope, $sce, moeLookupService) {
                    if (moeLookupService.model[$scope.to.data.lookupName]) {
                        $scope.to.options = moeLookupService.model[$scope.to.data.lookupName];
                    }
                    else {
                        $scope.to.loading = moeLookupService.loadLookup($scope.to.data.lookupName).then(function (data) {
                            $scope.to.options = data;
                            return data;

                        });
                    }

                    $scope.trustAsHtml = function (html) {
                        return $sce.trustAsHtml(html);
                    };
 
               
           
                    //$scope.options.templateOptions.onBlur = function ($scope) {
                    //    $scope.model['EstimatedUnitsMeasurement'];// = value;
                    //};

                }
 
 
              
            });

            formlyConfigProvider.setType({
                name: 'ui-select-pack',
                extends: 'select',
                templateUrl: 'moe-form/directives/moe-form/templates/moe-form-ui-select-single.tpl.html',
                controller: /* @ngInject */ function ($scope, $sce, moeLookupService) {
                    if (moeLookupService.model[$scope.to.data.lookupName]) {
                        $scope.to.options = moeLookupService.model[$scope.to.data.lookupName];
                    }
                    else {
                        $scope.to.loading = moeLookupService.loadLookup($scope.to.data.lookupName).then(function (data) {
                            $scope.to.options = data;
                             return data;

                        });
                    }
                   

                    $scope.trustAsHtml = function (html) {
                        return $sce.trustAsHtml(html);
                    };

                    function validOptionsClearFiealds(attr) {
                        if(attr.option === null)
                        { return false; }
                        if (attr.fields === null || attr.fields.length === 0)
                        { return false; }
                        if ($scope.model[$scope.options.key] === attr.option)
                        { return false; }
                        return true;
                    }

                    function clearFields() {
                        if (!$scope.to.clearFields || $scope.to.clearFields === undefined || $scope.to.clearFields === null ||
                              $scope.to.clearFields.length === 0) {
                            return;
                        }

                        angular.forEach($scope.to.clearFields, function (attrs) {
                            if (validOptionsClearFiealds(attrs)) {
                                angular.forEach(attrs.fields, function (attr) {
                                    // $scope.model[attr.name] = null;
                                    delete $scope.model[attr.name];
                                });
                            }
                        });

                    }
                    $scope.options.templateOptions.onChange = function ($scope) {
                        clearFields();
                    };
                }



            });
 
            formlyConfigProvider.setType({
                name: 'ui-select-single-select2',
                extends: 'select',
                templateUrl: 'moe-form/directives/moe-form/templates/moe-form-ui-select-single-select2.tpl.html',
                controller: /* @ngInject */ function($scope, $sce, moeLookupService) {
                    if (moeLookupService.model[$scope.to.data.lookupName]) {
                        $scope.to.options = moeLookupService.model[$scope.to.data.lookupName];
                    }
                    else {
                        $scope.to.loading = moeLookupService.loadLookup($scope.to.data.lookupName).then(function (data) {
                            $scope.to.options = data;
                            return data;

                        });
                    }
                    $scope.trustAsHtml = function(html) {
                        return $sce.trustAsHtml(html);
                    };
                }
            });
 
            formlyConfigProvider.setType({
                name: 'ui-select-single-search',
                extends: 'select',
                templateUrl: 'moe-form/directives/moe-form/templates/moe-form-ui-select-single-async-search.tpl.html',
                controller: /* @ngInject */ function($scope, $sce, moeLookupService) {
                    if (moeLookupService.model[$scope.to.data.lookupName]) {
                        $scope.to.options = moeLookupService.model[$scope.to.data.lookupName];
                    }
                    else {
                        $scope.to.loading = moeLookupService.loadLookup($scope.to.data.lookupName).then(function (data) {
                            $scope.to.options = data;
                            return data;

                        });
                    }
 
                    $scope.trustAsHtml = function(html) {
                        return $sce.trustAsHtml(html);
                    };
                }
            });
 
            formlyConfigProvider.setType({
                name: 'ui-select-multiple',
                extends: 'select',
                templateUrl: 'moe-form/directives/moe-form/templates/moe-form-ui-select-multiple.tpl.html',
                controller: /* @ngInject */ function($scope, $sce, moeLookupService) {
                    if (moeLookupService.model[$scope.to.data.lookupName]) {
                        $scope.to.options = moeLookupService.model[$scope.to.data.lookupName];
                    }
                    else {
                        $scope.to.loading = moeLookupService.loadLookup($scope.to.data.lookupName).then(function (data) {
                            $scope.to.options = data;
                            return data;

                        });
                    }
                    $scope.trustAsHtml = function (html) {
                        return $sce.trustAsHtml(html);
                    };
                }
            });
 
            /* Async Select Control - implements call to lookupService */
            formlyConfigProvider.setType({
                name: 'selectAsync',
                extends: 'select',
                defaultOptions: {
                    wrapper: 'loading',
                    templateOptions: {
                        label: 'selectAsync',
                        placeholder: 'Select a value',
                        options: []
                    },
                    controller: /* @ngInject */ function($scope, moeLookupService) {
                        if (moeLookupService.model[$scope.to.data.lookupName]) {
                            $scope.to.options = moeLookupService.model[$scope.to.data.lookupName];
                        }
                        else {
                            $scope.to.loading = moeLookupService.loadLookup($scope.to.data.lookupName).then(function (data) {
                                $scope.to.options = data;
                                return data;

                            });
                        }
                    }
                }
            });
            
            formlyConfigProvider.setType({
                name: 'select-group',
                extends: 'select',
                defaultOptions: {
                    templateOptions: {
                        label: 'select',
                        placeholder: 'בחר ערך',
                        options: []
                    },
                    link: function aaa(scope, element, attrs, ngModel) {
                       // JSON.stringify(element);
                    },  
                    controller: /* @ngInject */ function ($scope, $rootScope) {
                       // JSON.stringify($scope);
                        
                    }
                }
            });
        });
 
 
 
 
    angular
        .module('moeForm')
        .run(function run(formlyConfig, formlyValidationMessages) {
            formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';
            formlyValidationMessages.addStringMessage('required', 'חובה למלא שדה זה');
            formlyValidationMessages.addStringMessage('pattern', 'תווים לא חוקיים');
            formlyValidationMessages.addStringMessage('maxlength', 'אורך תווים לא חוקי');
            formlyValidationMessages.addStringMessage('minlength', 'אורך תווים קצר מידי');
            formlyValidationMessages.addStringMessage('max', 'מספר גדול מידיי');  
        });
 
    angular
        .module('moeForm')
        .controller('GetContentController', function($scope, $log, moeReadFileService) {
            // var vm = this;
            $log.info("GetContentController()");
            $scope.showContent = function($fileContent) {
                if ($scope.fileExtension === "xml")
                { $scope.content = moeReadFileService.convertXMLtoJSON($fileContent); }
 
 
            };
        });
 
    angular
        .module('moeForm')
        .filter('unique', function() {
            return function(collection, keyname) {
                var output = [],
                    keys = [];
 
                angular.forEach(collection, function(item) {
                    var key = item[keyname];
                    if (keys.indexOf(key) === -1) {
                        keys.push(key);
                        output.push(item);
                    }
                });
 
                return output;
            };
        });
    angular.module('moeForm').directive('requireMultiple', function () {
        return {
            require: 'ngModel',
            link: function postLink(scope, element, attrs, ngModel) {
                ngModel.$validators.required = function (value) {
                    return angular.isArray(value) && value.length > 0;
                };
            }
        };
    });
 
})();

 
 
