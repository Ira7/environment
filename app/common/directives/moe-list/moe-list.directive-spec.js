(function () {
    'use strict';

    describe('moeList', function () {

        var $scope, $compile, httpBackend, moeDialog, template, element, toxinsService;

        beforeEach(function () {
            //module('moeTemplates');
            module('moeDialog');
            module('common');
            module('toxins');
            inject(function ($rootScope, _$compile_, _moeDialog_) {
                $scope = $rootScope.$new();
                $compile = _$compile_;
                //  moeDialog = _moeDialog_;
                //   toxinsService = _toxinsService_;

                $scope.data = [
                    {
                        "CasNumber": "4564546",
                        "MaterialName": "rtyrtrtyrty",
                        "disabledCasName": true,
                        "MaterialState": "4bed58ce-3d38-e411-8024-005056965bd9",
                        "Volume": 45456,
                        "VolumeMeasurementUnits": "b4608c89-2e7a-e411-b888-005056965bd9",
                        "MaximumAmountHold": 4545,
                    },
                {
                    "CasNumber": "2222",
                    "MaterialName": "fffffffff",
                    "disabledCasName": true,
                    "MaterialState": "4bed58ce-3d38-e411-8024-005056965bd9",
                    "Volume": 333,
                    "VolumeMeasurementUnits": "b4608c89-2e7a-e411-b888-005056965bd9",
                    "MaximumAmountHold": 22,
                }
                ];
                $scope.schemaForm = [
                     {
                         "key": "field1",
                         "type": "input",
                         "defaultValue": "bla bla 111",
                         "templateOptions": {
                             "label": "field 1",
                             "minlength": 0,
                             "maxlength": 255,
                             "pattern": "^[\\w\\d\\sא-ת]*$"
                         }
                     },
                     {
                         "key": "field2",
                         "type": "input",
                         "defaultValue": "bla bla 222",
                         "templateOptions": {
                             "label": "field 1",
                             "minlength": 0,
                             "maxlength": 255,
                             "pattern": "^[\\w\\d\\sא-ת]*$"
                         }
                     },
                ];
                $scope.schemaList = [
                  {
                      "name": "field1",
                      "header": "field 1"
                  },
                  {
                      "name": "field2",
                      "header": "field 2"
                  }
                ];
                element = $compile('<moe-list title="my form" key="key1" schema-list="schemaList" data="data" schema-form="schemaForm"></moe-list>')($scope);

                $scope.$apply();
            });
        });
        it("and so is a spec", function () {
           var a = true;

            expect(a).toBe(true);
        });

        //it('data.lenght = 1', function () {
        //    expect($scope.data.length).toEqual(1);
        //});

        ///*edit*/
        // it('changed data', function () {

        //    var templateAsHtml = element.html;
        //    console.log('templateAsHtml   :   ' + templateAsHtml);
        //    console.log('element.text   :   ' + element.text);
        //    expect(element.text()).toContain('4564546');
        // });

        /*add*/
        //it('add item', function () {
        //    //$scope.addNewItem();
        //    //expect($scope.test).toBeDefined();


        //});
        /*delete*/
        //it('should be delete one item', function () {
        // //   var item = $scope.data[1];
        //    //  $scope.deleteItem(item);
        //    expect(1).toEqual(1);
        //});

    });

})();
