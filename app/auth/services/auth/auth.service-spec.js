(function () {
    'use strict';

    describe('auth', function () {

        var service;

        beforeEach(function () {
            module('auth');

            inject(function ( authService ) {
                service = authService ;
            });
        });

        it('should expose API', function () {

            expect(service.saveRegistration).toBeDefined();
            expect(service.authentication).toBeDefined();

        });

    });

})();
