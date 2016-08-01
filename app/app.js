(function () {
    'use strict';

    angular.module('ipapp', ['common', 'shell', 'home', 'help', 'auth', 'nav', 'sidenav', 'pascalprecht.translate', 'toxins', 'moeDialog', 'moeSites']);

    // CONFIG: App (module)
    angular
        .module('ipapp')
        .config(function ($stateProvider, $httpProvider, localStorageServiceProvider, logExProvider) {


            /* configure log extender */
            logExProvider.enableLogging(true);
            //logExProvider.restrictLogMethods(['log', 'info']);
            
            
            /* configure loading bar */
            //cfpLoadingBarProvider.latencyThreshold = 100;
            //cfpLoadingBarProvider.includeBar = false;
            //cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';

            $stateProvider.state("otherwise", {
                url: "*path",
                template: "",
                controller: [
                    '$state',
                    function ($state) {
                        //$state.go('shell.auth.signin');
                        //TODO: change state!!
                        $state.go('shell');//.toxins.permits
                       // $state.go('shell.toxins.permit.step.form', { actionName: "renewal", stepName: "general" });
                    }
                ]
            });
            /* Add New States Above */

            /* Config: local storage */
            localStorageServiceProvider
                .setPrefix('MyApp')
                .setStorageType('sessionStorage')
                .setNotify(true, true);

            /* add Authentication Interceptor */
            $httpProvider.interceptors.push('authInterceptor');

        });

    // RUN: App (module)
    angular
        .module('ipapp')
        .run(function ($log, $rootScope) {
            
            $log = $log.getInstance('app', true);
            $log.debug("run()");

            // moment.js locale (used by gantt)
            // amMoment.changeLocale('he', {
            //   week : {
            //     dow : 0, // Monday is the first day of the week.
            //     doy : 4 // The week that contains Jan 4th is the first week of the year.
            //   }
            // });

            /* catch all state change requests and check authentication */
            //function onStateChangeStart(event, toState, toParams, fromState, fromParams) {
            //    var msg = "onStateChangeStart: from-" + fromState.name + " to-" + toState.name;
            //    logger.log(msg);

            //    // if use not authenticated - go to login state
            //    if (toState.name !== "auth" && !authService.isAuthenticated) {
            //        event.preventDefault();
            //        $state.go('auth');
            //    }
            //}

            //$rootScope.$on('$stateChangeStart', onStateChangeStart);

            $rootScope.safeApply = function (fn) {
                var phase = $rootScope.$$phase;
                if (phase === '$apply' || phase === '$digest') {
                    if (fn && (typeof (fn) === 'function')) {
                        fn();
                    }
                } else {
                    this.$apply(fn);
                }
            };

        });

})();
