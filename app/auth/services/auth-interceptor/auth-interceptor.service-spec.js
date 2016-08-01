(function () {
    'use strict';

    describe('authInterceptor', function () {

        var service;

        beforeEach(function () {
            module('auth');

            inject(function ( authInterceptor ) {
                service = authInterceptor ;
            });
        });

        it('should ...', function () {

            //TODO: Implement your service spec logic here
            //expect(service.doSomething()).toEqual('something');

        });

    });

})();
