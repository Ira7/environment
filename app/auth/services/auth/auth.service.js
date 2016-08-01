(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * Auth Object/function
     */
    function AuthService($q, $state, dataService, localStorageService) {

        /***************** PRIVATE *******************/
        //var serviceBase = 'http://localhost:55210/';
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName: ""
        };
        function _logOut() {

            // TODO Send logout request to server ?

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";

        }


        function _saveRegistration(registration) {

            _logOut();

            return dataService.post('/api/account/register', registration)
                .then(function (response) {
                    return response;
                });

        }
     

        function _login(loginData) {
            var deferred = $q.defer();

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;
            dataService.post('/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
              .then(function successCallback(response) {
                  
                  if(response.status !== 200){
                      deferred.reject(response);
                      return;
                  }
                  
                localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName });
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;

              }, function errorCallback(response) {

                console.error(response);
                _logOut();
                deferred.reject(response);

              });

            return deferred.promise;

        }


        /****************** PUBLIC *******************/
        var service = {
            saveRegistration: _saveRegistration,
            login: _login,
            logOut: _logOut,
            authentication: _authentication
        };

        return service;

    }

    /* ANGULAR */
    angular
        .module('auth')
        .factory('authService', AuthService );

})();
