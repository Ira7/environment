(function () {
    'use strict';

    describe('signin', function () {

        var scope, compile;

        beforeEach(function () {
            module('auth');

            inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                compile = $compile;
            });
        });

        it('should ...', function () {

            //TODO: Implement your complex directive spec logic here
            /*
            To test your directive, you need to create some html that would use your directive,
            send that through compile() then compare the results.

            var element = compile('<div mydirective name="name">hi</div>')(scope);
            expect(element.text()).toBe('hello, world');
            */

        });

    });

})();
