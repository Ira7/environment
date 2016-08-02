(function () {
    'use strict';

    fdescribe('dataService', function () {

        var dataService, $httpBackend;

        beforeEach(function () {
            module('common');

            inject(function (_dataService_, _$httpBackend_) {
                dataService = _dataService_;
                $httpBackend = _$httpBackend_;
            });
        });
        
        afterEach(function(){
           $httpBackend.verifyNoOutstandingExpectation();
           $httpBackend.verifyNoOutstandingRequest(); 
        });
     
        /**
         * test API (Public Interface)
         */
        describe("API", function(){
           
            it('has get', function () {
                expect(dataService.get).toBeDefined();
            });
            
        });
        
            
        it('/myUrl - return json object', function () {

            var request = '/myUrl';
            var response = {"name": "Erez"};
            $httpBackend.expectGET(request).respond(response);
            
            var resultPromise = dataService.get(request);
            
            var result;
            resultPromise.then(function(response){
               result = response; 
            });
            
            $httpBackend.flush();
            
            expect(result).toEqual(response);

        });

    });

})();
