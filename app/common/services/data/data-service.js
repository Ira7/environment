(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * DataService Object/function
     */
    function DataService($log, $q, $http,PubSub, ENV) {

        $log = $log.getInstance('DataService', true);
        $log.debug("load()");

        /***************** PRIVATE *******************/


        /**
         * sendRequest() - wraps call to $http
         */
        function _sendRequest(req) {
            
            var defer = $q.defer();
            
            $log.debug("sendRequest()", req);
            
            $http(req)
                .then(function successCallback(response) {
                    $log.debug("response = ", response);
                    if (response.status >= 200 && response.status < 300) {
                        defer.resolve(response.data);
                    }
                    else{
                        $log.warn("status = ", response.status);
                        if (response.status === 401) {
                            PubSub.publish('message-show', { 'msg': 'העבודה מול המערכת עומדת להסתיים הנך מועבר לדף התחברות מחדש' });
                        }
                        defer.reject(null);
                    }
                }, function errorCallback(response) {
                    $log.error("response = ", response);
                    defer.reject(null);
                });
                
            return defer.promise;
        }


        
        function _get(url) {

            $log.debug("get(" + url + ")");

            var req = {
                method: 'GET',
                url: url
            };

                req.headers = {};
                $.extend(req.headers, ENV.apiHeadersConf);

            return _sendRequest(req);
        }

      
        function _post(url, data, headers) {

            $log.debug("post(" + url + ")");

            var req = {
                method: 'POST',
                url: url,
                headers:headers,
                data: data
            };

            if (req.headers) {
                $.extend(req.headers, ENV.apiHeadersConf);
            }
            else {
                req.headers = {};
                $.extend(req.headers, ENV.apiHeadersConf);
            }

            
            return _sendRequest(req);

        }

        function _put(url, data, headers) {

            $log.debug("put(" + url + ")");

            var req = {
                method: 'PUT',
                url: url,
                headers: headers,
                data: data
            };

            if (req.headers) {
                $.extend(req.headers, ENV.apiHeadersConf);
            }
            else {
                req.headers = {};
                $.extend(req.headers, ENV.apiHeadersConf);
            }

            return _sendRequest(req);

        }



        // TODO IN PRODUCTION - REMOVE COMMENTS.
        /**
         * GET request() - Private function
         */
        //function _get(url , headers) {

        //    $log.debug("get(" + url + ")");

        //    var req = {
        //        method: 'GET',
        //        url: url
        //    };

        //    return _sendRequest(req);
        //}

        /**
         * POST request() - Private function
         */
        //function _post(url, data, headers) {

        //    $log.debug("post(" + url + ")");

        //    var req = {
        //        method: 'POST',
        //        url: url,
        //        headers:headers,
        //        data: data
        //    };

        //    return _sendRequest(req);

        //}

        /**
         * PUT request() - Private function
         */
        //function _put(url, data, headers) {

        //    $log.debug("put(" + url + ")");

        //    var req = {
        //        method: 'PUT',
        //        url: url,
        //        headers: headers,
        //        data: data
        //    };

        //    return _sendRequest(req);

        //}

        /****************** PUBLIC *******************/
        var service = {
            get: _get,
            post: _post,
            put: _put
        };

        return service;
    }

    /* ANGULAR */
    angular
        .module('common')
        .factory('dataService', DataService);

})();
