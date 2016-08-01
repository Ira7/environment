(function () {
    'use strict';

    describe('moeLookup', function () {

        var moeLookupService, $q, deferred, httpBackend, myThings, errorStatus, handler, ENV;
       
        beforeEach(function () {
            module('common');

            inject(function (_$q_, $httpBackend, _moeLookupService_) { //_ENV_
                $q = _$q_;
                httpBackend = $httpBackend;
                moeLookupService = _moeLookupService_;
               // ENV = _ENV_;
            });
            deferred = $q.defer();
       
            myThings = '';
            errorStatus = '';
            handler = {
                success: function (data) {
                    myThings = data;
                },
                error: function (data) {
                    errorStatus = data;
                }
            };
         
        });

        it("should call the getValueByID and throws the value", function () {
            spyOn(moeLookupService, 'getValueByID').and.throwError("some error");
            expect(function() {
                moeLookupService.getValueByID('Managment/Material/', '123');
            }).toThrowError("some error");
        });


        it('should call the getValueByID with success', function () {
            spyOn(handler, 'success').and.callThrough();
           // spyOn(handler, 'error').and.callThrough();
            spyOn(moeLookupService, 'getValueByID').and.callThrough();

            var response = 'one thing';
        //  ENV.apiEndpoint = '/api/v1/';
            httpBackend.expectGET("/api/v1/Managment/Material/123").respond(response);
            moeLookupService.getValueByID('Managment/Material/', '123').then(handler.success);
            httpBackend.flush();

            expect(moeLookupService.getValueByID).toHaveBeenCalled();
            expect(handler.success).toHaveBeenCalled();
            expect(myThings).toEqual(response);
        });

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

      

   
     
      

    });

})();
