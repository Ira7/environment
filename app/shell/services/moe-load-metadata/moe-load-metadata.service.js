(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeLoadMetadata Object/function
     */
    function MoeLoadMetaData($log, $q, PubSub, moeLookupService, moeDialog, moeSitesService) {

        /***************** PRIVATE *******************/

        //always bind to an object.property
        var _model = {
        
        };
        //function _logOut() {       
        //  setTimeout(function () {
        //      window.location.href = "https://192.168.88.51/cmd=logout";
        //  }, 5000);
        //}
        /*Every 3 hours the app disconnects*/
        //setInterval(function () {
        //  //  toastr.info('העבודה מול המערכת עומדת להסתיים הנך מועבר לדף התחברות מחדש');  
        //   _logOut();
        //}, 1.08e+7);// 3 hours = 1.08e+7 ms

        /*Every fifteen minutes of inactivity application disconnects*/
        //function _disconnectsInactivity() {
        //    var data = {
        //        title: "הודעה על ניתוק מערכת",
        //        message: "לא בוצעה פעילות במערכת במשך זמן",
        //        cancel: "יציאה מהמערכת",
        //        ok: "המשך בעבודה"
        //    };
        //    $('body').on("click mousemove keyup", _.debounce(function () {
        //        //moeDialog.showConfirmDialog(data).then(function (result) {
        //        //    $log.debug('showConfirmDialog', result);
        //        //    if (result.value === false) {
        //        //        // _logOut();
        //        //        window.location.href = "https://192.168.88.51/cmd=logout";
        //        //    }
        //        //});
             
        //    }, 20000));
        // //   setInterval(function () { window.location.href = "https://192.168.88.51/cmd=logout"; }, 5000);
        //}
        //_disconnectsInactivity();

        /**
         * doSomething() - Private function
         */
        function _loadMetaData() {
            $log.debug("_loadMetaData()");

            _model.loading = true;
            _model.initialized = false;

            var deferred = $q.defer();
           
            $q.all([
                //REMOVE +++++
                moeLookupService.loadLookup("lookups/VolumeMeasurement"),
               // moeLookupService.loadLookups(),
                moeSitesService.init()
            ]).then(
                function (result) {
                    $log.debug(result);
                    _model.loading = false;
                    _model.initialized = true;
                    deferred.resolve(result);
                },
                function (error) {
                    $log.error(error);
                    _model.loading = false;
                    _model.initialized = false;
                    var err101 = {
                        errCode: 101,
                        errMsg: "תקלה באיתחול נתוני מערכת",
                        errDesc: "לטיפול הבעיה נא לפנות למוקד תמיכה 073-3733333"
                    };
                    PubSub.publish("message-show", err101);
                    deferred.reject(error);
                 }
                );

            return deferred.promise;

        }

        /****************** PUBLIC *******************/
        var service = {
            loadMetaData: _loadMetaData,
            get Model() {
                return _model;
            }
        };

        return service;
    }
    
    /* ANGULAR */
    angular
        .module('shell')
        .factory('moeLoadMetaData', MoeLoadMetaData );

})();
