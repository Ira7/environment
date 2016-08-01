(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * AuthInterceptor Object/function
     */
    function AuthInterceptor($q, $location, $injector, localStorageService) {
        var service = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        };

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                var authData = localStorageService.get('authorizationData');

                if (authData) {
                    if (authData.useRefreshTokens) {
                        $location.path('/auth/refresh');
                        return $q.reject(rejection);
                    }
                }
                authService.logOut();
                $location.path('/auth/signin');
            }
            return $q.reject(rejection);
        };

        service.request = _request;
        service.responseError = _responseError;

        return service;
    }

    /* ANGULAR */
    angular
        .module('auth')
        .factory('authInterceptor', AuthInterceptor );

})();
