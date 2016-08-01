(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * Moeradiokey2value Object/function
     */
    function Moeradiokey2value() {

        /***************** PRIVATE *******************/


        /****************** PUBLIC *******************/
        //TODO: Implement your filter logic here
        return function (input, type) {
            if (type === 'radio') {
                switch (input) {
                    case true:
                        return 'כן';
                    case false:
                        return 'לא';
                    default:
                        return '';
                }

            }
        };

    }

    /* ANGULAR */
    angular
        .module('common')
        .filter('moeRadioKey2value', Moeradiokey2value);

})();

