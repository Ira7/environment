(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeDialog Object/function
     */
    function MoeDialog($log, $q, ngDialog) {
        $log = $log.getInstance('MoeDialogService', true);
        $log.debug("load()");

        /***************** PRIVATE *******************/
        var _dialog = null;

        /**
         * clear() - clears message(s)
         */
        function _clear() {
            _dialog = null;
        }

        /**
         * @name showDialog()
         */
        function _showDialog(title, message) {
            $log.debug("_showDialog(" + title + ", " + message + ")");
            _clear();

            var deferred = $q.defer();

            _dialog = ngDialog.open({
                template: '<div><h3>' + title + '</h3><p>' + message + '</p></div>',
                plain: true,
                className: 'ngdialog-theme-default'
            });

            _dialog.closePromise
                .then(function closed(data) {
                    $log.debug(data);
                    deferred.resolve(data);
                });

            return deferred.promise;

        }
        /**


       * @name showConfirmDialog()
       */
        function _showConfirmDialog(data) {
            $log.debug("showConfirmDialog");
            _clear();

            var deferred = $q.defer();

            _dialog = ngDialog.open({
                template: 'moe-dialog/templates/dialogYesNo.tpl.html',
                data: data,
                className: 'ngdialog-theme-default'
            });

            _dialog.closePromise
                .then(function closed(data) {
                    $log.debug(data);
                    deferred.resolve(data);
                });

            return deferred.promise;
        }

        /**
         * @name showDialogFormTemplate()
         */
        function _showDialogFormTemplate(template, data, className) {
            $log.debug("showDialogFormTemplate()");
            _clear();

            var deferred = $q.defer();

            _dialog = ngDialog.open({
                template: template,
                data: data,
                className: className, //'ngdialog-theme-default',
                showClose: false,
                closeByDocument: false,
                closeByEscape: false,
            });

            _dialog.closePromise
                .then(function closed(data) {
                    $log.debug(data);
                    deferred.resolve(data);
                });

            return deferred.promise;

        }

        /**
         * @name showDialogFormTemplate()
         */
        function _showDialogTemplate(template, data, className) {
            $log.debug("_showDialogTemplate()");
            _clear();

            var deferred = $q.defer();

            _dialog = ngDialog.open({
                template: template,
                data: data,
                className: className || 'ngdialog-theme-default'
            });
            _dialog.closePromise
                .then(function closed(data) {
                    $log.debug(data);
                    deferred.resolve(data);
                });
            return deferred.promise;

        }

        /**
         * onReload called when goals need to be reloaded.
         */
        //function onDialogShow(msg) {
        //    _showDialog(msg["code"], msg["msg"], msg["desc"]);
        //}

        // init
        _clear();

        /****************** PUBLIC *******************/
        var service = {
            //model: _model,
            showDialog: _showDialog,
            showDialogTemplate: _showDialogTemplate,
            showDialogFormTemplate: _showDialogFormTemplate,
            showConfirmDialog: _showConfirmDialog,
            clear: _clear  
        };

        return service;
    }

    /* ANGULAR */
    angular
        .module('moeDialog')
        .factory('moeDialog', MoeDialog);

})();
