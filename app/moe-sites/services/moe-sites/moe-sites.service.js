(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeSitesService Object/function
     */
    function MoeSitesService($log, $q, $state, $stateParams, dataService, ENV) {

        $log = $log.getInstance('MoeSites', true);
        $log.debug("load()");

        /***************** PRIVATE *******************/

        var _model = {
            sites: {},
            siteItem: {}
        };
       
        function _loadSchema(url, modelName) {

            $log.debug("loadSchema()", url);
            var defer = $q.defer();

            dataService.get(url)
                .then(function success(data) {
                    $log.debug('loadSchema.success', data);
                  //  _model.siteSchema = data;
                    _model[modelName] = data;
                    defer.resolve(data);
                }, function error(err) {
                    $log.error("loadSchema.error()", err);
                    //  _model.siteSchema = null;
                    _model[modelName] = null;
                    defer.reject(err);
                });

            return defer.promise;
        }

        function _loadSitePermit(site) {

            if (site) {

            _model.siteItem = site;
            var d = new Date();
            var currentYear = d.getFullYear();
            var newId = site.EnvironmentSiteNumber + '-' + currentYear;
           
                if ($state.current.name === 'shell.sites') {
                    $state.go('shell.sites.id.toxins.apply.step.form', { siteId: newId, actionName: 'renewal', stepName: 'general' });//
                }
            }
       }

        function _loadCurrentSite(id) {
            $log.debug("loadCurrentSite()", id);
            if (id) {
            var facilityNum = [];
            facilityNum = id.split("-");
            if (facilityNum[0]) {  //_model.permitSites &&
                var item = _.find(_model.sites.Permit,
                 function (item) {
                     return item.EnvironmentSiteNumber === facilityNum[0];
                 });
                if (item) {
                    _model.siteItem = item;

                }
            }
          }
        }

        function _parseStatus() {
            $log.debug("parseStatus()");
                angular.forEach(_model.sites.Permit, function (value, key) {
            switch (value.PermitStatus) {
                case 0:
                    value.PermitStatusText = 'חדש';
                    return;
                case 2:
                    value.PermitStatusText = 'טיוטה';
                    return;
                case 1:
                    value.PermitStatusText = 'נשלח';
                    return;
                default:
                    return '';
            }
        });
        }
        function _parseDate() {
            $log.debug("_parseDate()");
            var newDate;
            if (_model.sites) {
                angular.forEach(_model.sites.Permit, function (value, key) {
                    if (value.EndDate){
                    var d = new Date(value.EndDate);
                    newDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
                    value.EndDate = newDate.toString();
                }

                });
            }
        }

        function _loadPermitSites() {
            var defer = $q.defer();
            $log.debug("loadPermitSites()");
            //REMOVE ++++
            dataService.get('/data/offline/permit-info.json').then(function success(data) {
           // dataService.get(ENV.apiEndpoint + 'toxins/permitsInfo/').then(function success(data) {
                $log.debug("loadPermitSites.success()", data);
                _model.sites = data;
                _parseDate();
                _parseStatus();
                _loadCurrentSite($stateParams.siteId);
                defer.resolve(data);
            }, function error(err) {
                $log.error("loadPermitSites.error()", err);
                _model.sites = null;
                defer.reject(err);
            });
            //_loadDataByURL('/data/listSites.json').then(function (data) {
            //    _model.permitSites = data;

            //});

            return defer.promise;

        }

        function _init() {
            $log.debug("init()");
            var defer = $q.defer();
            $q.all([
            _loadPermitSites(),
            _loadSchema(ENV.dataEndpoint + 'data/env-sites/permit/sites.json', 'siteSchema'),
            ]).then(function success(result) {
                $log.debug("init.success()", result);
                // return promise
                defer.resolve(result);
            }, function error(result) {
                $log.error("init.error()", result);
                // return promise
                defer.reject(result);
            }, function nofity(result) {
                $log.info("init.notify()", result);
                // return promise
                defer.notify(result);
            });

            return defer.promise;
        }
        //TODO: REMOVE THIS FUNCTION
        //function _getSiteInfo(){
        //    return _model.siteItem;
        //}

       


        /****************** PUBLIC *******************/
        var service = {
            get model() {
                return _model;
            },
            init: _init,
            loadSitePermit: _loadSitePermit,
            parseStatus: _parseStatus
            //getSiteInfo: _getSiteInfo
        };

        return service;

    }

    /* ANGULAR */
    angular
        .module('moeSites')
        .factory('moeSitesService', MoeSitesService);

})();
