(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * ToxinsService Object/function
     */
    function ToxinsService($log, $q, $state, $stateParams, $interval, $timeout, moeDialog, dataService, moeReadFileService, ENV, moeSitesService) {
        $log = $log.getInstance('ToxinsService', true);
        $log.debug("load()");

        /***************** PRIVATE *******************/

        //always bind to an object.property
        var _saveDraftInterval;
        var _model = {
            site: {},
            siteSchema: null,
            isSubmitted:null,
            steps: null,
            step: null,
            formName: null,
            permitData: {
                section_permitPostInfo: {
                    ToxinPermitNumber: "",
                    FacilityNumber: ""
                },
                section_permitGeneral: {},
                section_permitBasicMaterials: [],
                section_permitMixtures: [],
                section_permitWastes: [],
                section_permitWasteTreatmentFacilities: [],
                section_permitPestControl: [],
                section_permitMaterialsTransportation: [],
                section_permitBondedWarehousePortLabs: []
            },
            listOptions: [],
          //  formValid: null,
            formSchema: null,
           // draftStatus:null
        };


        /**
         * clear() - clears service model.
         */
        function _clear() {
            _model = {
                site: {},
                siteSchema:null,
                isSubmitted: null,
                steps: null,
                step: null,
                formName: null,
                // formData: null,
                permitData: {
                    section_permitPostInfo: {
                        ToxinPermitNumber: "",
                        FacilityNumber: ""
                    },
                    section_permitGeneral: {},
                    section_permitBasicMaterials: [],
                    section_permitMixtures: [],
                    section_permitWastes: [],
                    section_permitWasteTreatmentFacilities: [],
                    section_permitPestControl: [],
                    section_permitMaterialsTransportation: [],
                    section_permitBondedWarehousePortLabs: []
                },
                listOptions: [],
                formSchema: null,
            };
        }
        function _saveDraft(isShowToastr) {
            $log.debug("saveDraft");
           // console.log("saveDraft"+JSON.stringify(_model.permitData));
            if(isShowToastr !== false) {
                isShowToastr = true;
            }
                var defer = $q.defer();
                if (_model.site.EnvironmentSiteNumber) {
                    dataService.put(ENV.apiEndpoint + 'draft/environmentSite/' +_model.site.EnvironmentSiteNumber + '/subject/Toxins/module/Permit/action/Renew',
                        _model.permitData,  //   _model.permitData,
            {
                    "content-type": "application/json"
            }).then(function success(data) {
                        $log.debug("saveDraft.success()", data);
                        moeSitesService.model.siteItem.PermitStatus = 2;
                                if(isShowToastr) {
                                 toastr.info('הנתונים נשמרו בהצלחה'); }
                                defer.resolve(data);
                                 }, function error(err) {
                                $log.error("saveDraft.error()", err);
                                if (isShowToastr) {
                                    toastr.error('אנא פנה למרכז תמיכה 073-3733333', 'ישנה תקלה בשמירת הנתונים');
                                }
                        defer.reject(err);
                       });

                         }
                        return defer.promise;
                        }

          //  function _saveAnyTime() {
          //  // _saveDraftInterval = setInterval(function () {
          //      _saveDraft(false);
          ////  }, 10000);

          //   }

        function _setOptions4List() {
            $log.debug("setOptions4List()");
            _model.listOptions.isAdd = true;
            _model.listOptions.isEdit = true;
            _model.listOptions.isDelete = true;
            _model.listOptions.isDialog = false;
            _model.listOptions.isSave = true;
            _model.listOptions.classSection = "pad-marg";
            _model.listOptions.classH4 = "pad-h4";
        }

        /**
         * loadWizard() - Load Data for form X
         */
        function _loadWizard() {
            var defer = $q.defer();

            var url = ENV.dataEndpoint + 'data/wizard/toxins/permit.json';
       //     $timeout(function(){
            dataService.get(url)
                .then(function success(data) {
                    _model.steps = data;
                    _model.step = _model.steps[0];
                    // return promise
                    defer.resolve(data);
               // }, 2000);
                }, function error(err) {
                    _model.steps = null;
                    _model.step = null;
                    // return promise
                    defer.reject(err);
                });

            return defer.promise;

        }
        function _init() {
            $log.debug("_init()");
            _clear();
            _setOptions4List();
            _loadWizard();
            _model.site = moeSitesService.model.siteItem;
            _model.siteSchema = moeSitesService.model.siteSchema;
            if (_model.site.Draft) {
                _model.permitData = _model.site.Draft;
            }
            if (_model.site.PermitStatus !== 1){           
               // _saveAnyTime();
                _model.isSubmitted = false;
            }
            else if (_model.site.PermitStatus === 1) { //הבקשה נשלחה
                _model.isSubmitted = true;
            }
           
        }
        
        
        function _loadDataByURL(url) {
            $log.debug("loadDataByURL()", url);
            var defer = $q.defer();
            dataService.get(url)
                .then(function success(data) {
                    $log.debug(' data');
                    // return promise
                    defer.resolve(data);
                }, function error(err) {
                    $log.error("loadDataByURL.error()");
                    // return promise
                    defer.reject(err);
                });

            return defer.promise;
        }

        /**
         * loadSitePermit() - loads the permit detiles
         */
        /*  function _loadSitePermit(id) {

            if (id) {  //_model.permitSites &&
                var item = _.find(_model.permitSites.Permit,
                 function (item) {
                     return item.PermitID === id;
                 });
                if (item) {
                    _model.permitSite = item;
                    _model.permitNum = item.PermitNumber;
                }


                //id = id + '-' + new Date().getFullYear();
                if ($state.current.name === 'shell.toxins.permits') {
                    $state.go('shell.toxins.permits.permit', { siteId: id });
                }

            }

        }
        function _loadPermitSites() {
            $log.info("loadPermitSites()");
            dataService.get(ENV.apiEndpoint + 'toxins/permitsInfo/').then(function success(data) {
                $log.debug("loadPermitSites.success()", data);
                _model.permitSites = data;
                _loadSitePermit($stateParams.siteId);
            }, function error(err) {
                $log.error("loadPermitSites.error()", err);
                _model.permitSites = null;
            });
            //_loadDataByURL('/data/listSites.json').then(function (data) {
            //    _model.permitSites = data;

            //});

        }*/

        /**
         * loadData() - loads all data needed by this service
         */
        //function _loadData(formName) {
        //    $log.debug("loadData(formName)", formName);
        //    var defer = $q.defer();

        //    // TODO: Handle formName validation
        //    _model.formName = formName;

        //    // call all load functions in parallel
        //    $q.all([
        //      //  _loadWizard(),
        //      //  _loadPermitSites(),

        //    ]).then(function success(result) {
        //        $log.debug("loadData.success()", result);
        //        // return promise
        //        defer.resolve(result);
        //    }, function error(result) {
        //        $log.error("loadData.error()", result);
        //        // return promise
        //        defer.reject(result);
        //    }, function nofity(result) {
        //        $log.info("loadData.notify()", result);
        //        // return promise
        //        defer.notify(result);
        //    });

        //    return defer.promise;
        //}

        function _setStep(step) {
            $log.info("setStep()", step);
            _model.step = step;

        }
        //function _stopSave(){
        //    clearInterval(_saveDraftInterval);
        //}

        function _submit() {
            $log.debug("submit");
            var defer = $q.defer();
            if (_model.permitData) {
              //  _model.permitData.section_permitPostInfo = {};
                _model.permitData["section_permitPostInfo"]["ToxinPermitNumber"] = _model.site.PermitNumber;
                _model.permitData["section_permitPostInfo"]["FacilityNumber"] = _model.site.EnvironmentSiteNumber;
              //  _stopSave();
                dataService.post(ENV.apiEndpoint + 'toxins/permit/environmentSite/' + _model.site.EnvironmentSiteNumber + '/action/Renew',
                   _model.permitData,
             { "content-type": "application/json" }).then(function success(data) {
                 $log.debug("submit.success()", data);
               
                 if (data.isValid === true) {
                     console.log("For EREZ "+ data.isValid + "  " + data.saveToCRM + " " + data.deleteDraft);
                     moeSitesService.model.siteItem.PermitStatus = 1;
                     toastr.success('הנתונים נשלחו בהצלחה');
                     $state.go('shell.sites');
                 }
                 else if (data.isValid === false) {
                     toastr.error('אנא פנה למרכז תמיכה 073-3733333', ' ישנה תקלה בשליחת הבקשה');
                 }
                defer.resolve(data);
            }, function error(err) {
                $log.error("submit.error()", err);
                toastr.error('אנא פנה למרכז תמיכה 073-3733333', ' ישנה תקלה בשליחת הבקשה');
               // _saveAnyTime();
                defer.reject(err);
            });
            }
            return defer.promise;
        }

        //function _setOptions4List() {
        //    $log.debug("setOptions4List()");
        //    _model.listOptions.isAdd = true;
        //    _model.listOptions.isEdit = true;
        //    _model.listOptions.isDelete = true;
        //    _model.listOptions.isDialog = false;
        //}
        //_setOptions4List();

        /****************** PUBLIC *******************/
        var service = {
           // loadData: _loadData,
            get model() {
                return _model;
            },
            setStep: _setStep,
            init:_init,
           // getListKey: _getListKey,
            saveDraft: _saveDraft,
            loadDataByURL: _loadDataByURL,
           // loadSitePermit: _loadSitePermit,
            submit: _submit,
           // stopSave: _stopSave
           // getDraft: _getDraft,
          //  loadPermitSites: _loadPermitSites
        };

        return service;
    }
    /* ANGULAR */
    angular
        .module('toxins')
        .factory('toxinsService', ToxinsService);

})();
