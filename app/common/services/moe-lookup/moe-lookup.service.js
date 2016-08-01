(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeLookupService Object/function
     */
    function MoeLookupService($log, $q, $filter, dataService, ENV) {

        $log = $log.getInstance('MoeLookupService', true);
        $log.debug("load()");

        /***************** PRIVATE *******************/

        //always bind to an object.property
        var _model = {

        };

            function _loadlookupsName(url) {
                $log.debug("loadlookupsName() - url:" + url);

                var defer = $q.defer();
                dataService.get(url)
                    .then(function success(data) {
                        // return promise
                        defer.resolve(data);
                    }, function error(err) {
                        // return promise
                        defer.reject(err);
                    });

                return defer.promise;
            }
            function _loadLookup(lookupName) {
                $log.debug("loadLookup() - lookupName:" + lookupName);
                var defer = $q.defer();
               // var promises = [];
                //get apiEndPoint from config file
                // REMOVE+++++++
                var url = '/data/offline/lookups.json';
                //var url = ENV.apiEndpoint + lookupName;

                dataService.get(url)
                    .then(function success(data) {

                        //TODO - check (erez)
                        if(!angular.isArray(data)){
                            var message = "loadLookup() - lookupName:" + lookupName  + "Is Not Array";
                            $log.debug(message);
                            $q.reject(message);
                        }
                        _model[lookupName] = data;
                        // return promise
                        defer.resolve(data);
                    }, function error(err) {
                        _model[lookupName] = null;
                        // return promise
                        defer.reject(err);
                    });

                return defer.promise;

            }


            function _loadLookups() {
            $log.debug("loadLookups()");
            var deferred = $q.defer();
            var url = ENV.dataEndpoint+'data/lookups/toxins/lookupsName.json';
             var promises = [];
            /*load json of all lookup names*/
            _loadlookupsName(url).then(function success(lookupNames) {
                if (lookupNames) {
                    for (var i = 0; i < lookupNames.length; i++) {
                        var promise = _loadLookup(lookupNames[i]);
                        promises.push(promise);
                    }
                    $q.all(promises).then(function success() {
                        $log.debug("success");
                        deferred.resolve("success");
                    },
                    function error(err) {
                        $log.debug(err);
                        deferred.reject(err);
                    });

                }
            }, function failure(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

          /* loadLookup() - Load a specific Lookup */


            function _loadLookupCRM(lookupName) {
            $log.debug("_loadLookupCRM()");
            var defer = $q.defer();

                //get apiEndPoint from config file
            var url = ENV.apiCrmEndpoint +lookupName;

            dataService.get(url)
                .then(function success(data) {
                    _model[lookupName] = data;
                    // return promise
                    defer.resolve(data);
            }, function error(err) {
                    _model[lookupName] = null;
                // return promise
                    defer.reject(err);
            });

            return defer.promise;

            }

   
            function _getValueByID(lookupName, id) {
            $log.debug("getValueByID()");
            var defer = $q.defer();

                //TODO: add check if no lookupName...
          //  var url = '/api/v1/' + lookupName + id;
            var url = ENV.apiEndpoint + lookupName +id;

            dataService.get(url)
                .then(function success(data) {
                    _model[id] = data;
                    // return promise
                    defer.resolve(data);
            }, function error(err) {
                    _model[id] = null;
                // return promise
                    defer.reject(err);
            });

            return defer.promise;
        }

            /*get id and name lookup and return item value */
            function _findValueByID(ids, nameLookup) {
            $log.debug("findValueByID()");
            var strValue = '';
            if (_model[nameLookup]) {
                if (typeof ids === 'string') {
                    ids = ids.split(",");
            }
                for (var i = 0; i < ids.length; i++) {
                    var value = $filter('filter')(_model[nameLookup], { ItemID: ids[i]});
                    if (strValue)
                    { strValue += ', ';
                }
                    strValue += value[0].ItemName;
            }
                return strValue;
            }
            return '';
        }

            /****************** PUBLIC *******************/
        var service = {
            loadLookup: _loadLookup,
            loadLookups: _loadLookups,
         //   loadCasNumber: _loadCasNumber,
            loadLookupCRM: _loadLookupCRM,
            findValueByID: _findValueByID,
            getValueByID: _getValueByID,

            get model() {
                return _model;
        }
        };

        return service;

    }

    /* ANGULAR */
    angular
        .module('common')
        .factory('moeLookupService', MoeLookupService );

})();
