(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeReadFile Object/function
     */
    function MoeReadFile($parse) {

        /***************** PRIVATE *******************/

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            var fn = $parse(iAttrs.moeReadFile);
                iElem.on('change', function (onChangeEvent) {
                    var reader = new FileReader();

                    reader.onload = function (onLoadEvent) {
                        scope.$apply(function () {
                            fn(scope, { $fileContent: onLoadEvent.target.result });
                        });
                    };
                    if (!onChangeEvent.target.files || !onChangeEvent.target.files[0]) {
                        return;
                    }
                    else
                    {
                        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                    }
                });
            }
        function MoeReadFileController($scope)
        {
            //var vm = this;
            $scope.checkFile = function (file) {

                var txt;
                $scope.fileExtension = file.split('.')[file.split('.').length - 1].toLowerCase();
                if ($scope.fileExtension !== "xml")
                {
                    //TODO: handle this case with ngDialog
                
                    txt = "File type : " + $scope.fileExtension + "\n\n";
                    txt += "Please make sure your file is in xml.\n\n";
                   // alert(txt);
                   
                }
            };
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'A',
            replace: true,
            scope: false,
            templateUrl: 'moe-form/directives/moe-read-file/moe-read-file.directive.html',
            link: _link,
            controller: MoeReadFileController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('moeForm')
        .directive('moeReadFile', MoeReadFile);

})();
