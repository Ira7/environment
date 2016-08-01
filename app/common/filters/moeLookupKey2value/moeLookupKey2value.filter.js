(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * Moelookupkey2value Object/function
     */
    function Moelookupkey2value(moeLookupService) {

        /***************** PRIVATE *******************/


        /****************** PUBLIC *******************/
        //TODO: Implement your filter logic here
            return function (input, lookupName) {

                if (input && lookupName) {
                    return moeLookupService.findValueByID(input, lookupName);
                }

                return "";
            };
        }


    /* ANGULAR */
    angular
        .module('common')
        .filter('moeLookupKey2value', Moelookupkey2value );

})();
