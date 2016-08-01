(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * MoeReadFileService Object/function
     */
    function MoeReadFileService($log, $q) {

        $log = $log.getInstance('moeReadFileService', true);
        $log.debug("load()");

        /***************** PRIVATE *******************/

        //always bind to an object.property
        var _model = {
            dataJSON: null,
            dataForm: {}
        };

        /**
         * _convertXMLtoJSON() - get xml object and convert to json object 
         */
        function _convertXMLtoJSON(contentFile) {
            $log.debug("contentFile()", contentFile);

            /*global X2JS */
            var x2js = new X2JS();
            _model.dataJSON = x2js.xml_str2json(contentFile);
           // toxinsService.aa;
            return _model.dataJSON;

        }
        function _buidFormData()
        {
     
            $log.debug("buidFormData()");
            _.each(_model.dataJSON, function (value, key) {
                console.log(key, value);
            });
            angular.forEach(_model.dataJSON['ToxinsPermit'], function (value, key) {
                if (key === 'PermitBasicMaterials') {
                    angular.forEach(_model.dataJSON['ToxinsPermit']['PermitBasicMaterials'], function (value1, key1) {
                        if (key1 === 'PermitBasicMaterial') {
                            angular.forEach(_model.dataJSON['ToxinsPermit']['PermitBasicMaterials']['PermitBasicMaterial'], function (value2, key2) {
                                switch (key2) {
                                    case 'CasNumberBasicMaterial':
                                        _model.dataForm.CasNumber = value2;
                                        break;
                                    case 'NameBasicMaterial':
                                        _model.dataForm.MaterialName = value2;
                                        break;
                                    case 'EstimatedAnnualAmount':
                                        _model.dataForm.EstimatedAnnualAmount = value2;
                                        break;
                                    case 'EstimateUnitsMeasurement':
                                        _model.dataForm.EstimatedUnitsMeasurement = value2;
                                        break;
                                    case 'MaximumAmountHold  ':
                                        _model.dataForm.MaximumAmountHold = value2;
                                        break;
                                    case 'MaximumUnitsMeasurement':
                                        _model.dataForm.MaximumUnitsMeasurement = value2;
                                        break;
                                    case 'StateMaterial':
                                        _model.dataForm.MaterialState = value2;
                                        break;
                                    case 'Volume':
                                        _model.dataForm.material_volume = value2;
                                        break;
                                    case 'VolumeMeasurementUnits':
                                        _model.dataForm.material_unitVolume = value2;
                                        break;
                                    case 'IsStoredAnotherSite':
                                        _model.dataForm.IsStoredAnotherSite = value2;
                                        break;
                                    case 'PermitNumber':
                                        _model.dataForm.ToxinPermitNumber = value2;
                                        break;
                                    case 'AmountStored':
                                        _model.dataForm.AmountStored = value2;
                                        break;
                                    case 'AmountStoredUnitsMeasurement':
                                        _model.dataForm.AmountStoredUnitsMeasurement = value2;
                                        break;
                                }
                            });
                         //   alert(value1 + ' ====> ' + key1);
                        }
                    //    alert(value1 + ' ====> ' + key1);

                    });

                 //   alert(value + ' ====> ' + key);
                }
                });  
        }
        /****************** PUBLIC *******************/
        var service = {
            convertXMLtoJSON: _convertXMLtoJSON,
            buidFormData: _buidFormData,
            get model() {
                return _model;
            },
            //set model(val) {
            //    _model = val;
            //}

        };

        return service;

    }

    /* ANGULAR */
    angular
        .module('common')
        .factory('moeReadFileService', MoeReadFileService);

})();
