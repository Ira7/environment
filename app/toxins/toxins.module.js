(function () {
    'use strict';

    // CREATE module
    angular
       .module('toxins', ['common', 'moeForm']);

    angular
        .module('toxins')
        .config(function ($stateProvider) {

         $stateProvider
                  .state('shell.sites.id', {
                      url: '/:siteId',
                      abstract: true,
                      views: {

                      }
                  })


                .state('shell.sites.id.toxins', {
                url: '/toxins',
                abstract: true,
                views: {
                  /*  'shellNavView': {
                        template: '<nav-private></nav-private>'
                    },
                    'shellSideView': {
                        template: '<sidenav></sidenav>'
                    },*/
                   
                    'shellContentView@shell': { // 'toxinsContentView@shell.sites': {
                        template: '<moe-toxins-container ></moe-toxins-container>'
                    }
                }
            })


         /*  .state('shell.toxins.permits', {
                url: '/permits',
                views: {
                    'moduleHeaderView@shell.toxins': {
                        template: '<h2> שם האתר:{{vm.model.permitSites.LegalEntityName}} </h2>'
                    },
                    'moduleContentView@shell.toxins': {
                        template: '<moe-sites set-permit-num="vm.onSetPermitSite" list="vm.model.permitSites.Permit" schema="vm.sitesSchema"></moe-sites>'
                    }
                }
            })
            .state('shell.toxins.permits.permit', {
                     url: '/:siteId',
                     views: {
                         'moduleHeaderView@shell.toxins': {
                             template: '<moe-page-header header="vm.model.permitNum"></moe-page-header>'
                         },
                         'moduleContentView@shell.toxins': {
                             template: '<moe-site-item state-name="\'shell.toxins.permits.permit.apply.step.form\' " state-params="{ actionName: \'renewal\', stepName: \'general\' }" item="vm.model.permitSite" get-draft-data="vm.onGetDraft()" schema="vm.sitesSchema"></moe-site-item>'
                         }
                     }
                 })*/

            .state('shell.sites.id.toxins.apply', {
                url: '/:actionName',
                abstract: true,
                views: {
                    'moduleHeaderView@shell.sites.id.toxins': {
                        template: '<moe-page-header schema="vm.model.siteSchema" model="vm.model.site"></moe-page-header>' //vm.model.sites.siteItem.PermitNumber
                    },
                    'moduleContentView@shell.sites.id.toxins': {
                        template: '<div ng-if="!vm.model.isSubmitted"><moe-wizard ng-if="vm.model.steps && !vm.isNoApply"  model="vm.model" on-set-step="vm.setStep" loadform="vm.onloadForm" load-list-schema="vm.onLoadSchemaList"  is-display-footer="vm.displayFooter" submit-data="vm.onSubmited()" save-data="vm.onSave()" save-data-with-param="vm.onSave" ></moe-wizard></div>' +
                            '<div class="moe-info-message" ng-if="vm.model.isSubmitted">בקשתך נשלחה לא תוכל להיכנס למערכת--שגית תביאי כיתוב מתאים!</div>'
                        

                    }
                }
            })

            .state('shell.sites.id.toxins.apply.step', {
                url: '/:stepName',
                abstract: true,
                views: {
                    'wizardStepsView@shell.sites.id.toxins.apply': {
                        template: '<moe-wizard-steps ng-if="vm.model.steps !==null"  steps="vm.model.steps" step="vm.model.step" on-step-selected="vm.moveToStep" ></moe-wizard-steps>' //is-valid="vm.model.formValid.$valid"
                    },
                    'wizardContentView@shell.sites.id.toxins.apply': {
                        template: '<moe-wizard-content model="vm.model" list-options="vm.model.listOptions"  set-list-schema="vm.loadListSchema" set-form-schema="vm.loadform" save-draft-data="vm.dataSave" submit-event="vm.submitData()" save-event="vm.saveData()" ></moe-wizard-content>'

                    },
                    'wizardFooterView@shell.sites.id.toxins.apply': {
                        template: '<moe-wizard-footer steps="vm.model.steps"  step="vm.model.step" on-move-next-step="vm.moveNext" on-move-prev-step="vm.movePrev" is-first-step="vm.isStepFirst()" is-last-step="vm.isStepLast()"></moe-wizard-footer>' //is-valid="vm.model.formValid.$invalid"
                    }
                }
            })
            .state('shell.sites.id.toxins.apply.step.form', { //.step.form
                    url: '/form',
                    views: {
                        'subContentWizard@shell.sites.id.toxins.apply.step': {
                            template: '<moe-form form-schema="vm.formSchema" form-data="vm.model.permitData.section_permitGeneral" show-buttons="false" class-name="general-form"></moe-form>'  // form="vm.model.formValid"
                              // + '<moe-print-for-dev is-show="true"  data="vm.model.permitData"></moe-print-for-dev>'   //+//save="vm.saveEvent()"

                        }

                    }
                })

            .state('shell.sites.id.toxins.apply.step.list', {
                    url: '/list',
                    views: {
                        'subContentWizard@shell.sites.id.toxins.apply.step': {
                            template: '<moe-list schema-list="vm.listSchema" title="vm.model.step.stepTitle" data="vm.model.permitData" key="vm.model.step.listKey" options-list="vm.listOptions" schema-form="vm.formSchema" save-data-form="vm.saveEvent()" ></moe-list>' +
                                '<moe-print-for-dev is-show="false"  data="vm.model.permitData"></moe-print-for-dev>' // data="vm.model.sites.siteItem.Draft"
                        }

                    }
            })
               .state('shell.sites.id.toxins.apply.step.listgroup', {
                   url: '/listgroup',
                   views: {
                       'subContentWizard@shell.sites.id.toxins.apply.step': {
                           template: ' <section ng-if="vm.listSchema && vm.formSchema[0]" >' +
                                    '<moe-list title="vm.model.step.titlePerform[0]" schema-list="vm.listSchema[1]" data="vm.model.permitData" key="vm.model.step.listKey[0]" options-list="vm.listOptions" schema-form="vm.formSchema[0]" save-data-form="vm.saveEvent()" ></moe-list>' +
                                    '<moe-list title="vm.model.step.titlePerform[1]" schema-list="vm.listSchema[2]" data="vm.model.permitData" key="vm.model.step.listKey[1]" options-list="vm.listOptions" schema-form="vm.formSchema[1]" save-data-form="vm.saveEvent()"></moe-list>' +
                                    '<moe-list title="vm.model.step.titlePerform[2]" schema-list="vm.listSchema[3]" data="vm.model.permitData" key="vm.model.step.listKey[2]" options-list="vm.listOptions" schema-form="vm.formSchema[2]" save-data-form="vm.saveEvent()" ></moe-list>' +
                                    '</section>'
                             
                       }

                   }
               })
            .state('shell.sites.id.toxins.apply.step.submit', {
                url: '/submit',
                views: {
                    'subContentWizard@shell.sites.id.toxins.apply.step': {
                        template: '<moe-summary  schema="vm.model.steps" is-disable-button = "vm.model.isSubmitted" data="vm.model.permitData" summary-template ="\'toxins/templates/summaryToxins.tpl.html\'" on-submit="vm.submitEvent()"></moe-summary>'
                    }
                }
            });

            /* Add New States Above */
        });

})();
