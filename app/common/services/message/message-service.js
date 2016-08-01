(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MessageService Object/function
     */
    function MessageService($log, PubSub) {

        $log = $log.getInstance('MessageService', true);
        $log.debug("load()");

        /***************** PRIVATE *******************/
        var _model = {
            message: null
        };

        /**
         * clear() - clears message(s)
         */
        function _clear() {
            _model.message = null;
        }

        /**
         * setMessage() - set a message on the model
         */
        function _setMessage(errCode, errMsg, errDescription) {
            _clear();
            var msg = {
                'code': errCode,
                'msg': errMsg,
                'desc': errDescription
            };

            _model.message = msg;
        }

        /**
         * onReload called when goals need to be reloaded.
         */
        function onMessageShow(msg , data) {
            _setMessage(data["errCode"], data["errMsg"], data["errDesc"]);
        }

        // Subscribe to event
        var sub = PubSub.subscribe('message-show', onMessageShow);

 

        // init
        _clear();

        /****************** PUBLIC *******************/
        var service = {
            model: _model,
            setMessage: _setMessage,
            clear: _clear
        };

        return service;
    }

    /* ANGULAR */
    angular
        .module('common')
        .factory('messageService', MessageService);

})();
