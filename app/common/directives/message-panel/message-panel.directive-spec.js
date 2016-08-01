(function () {
    'use strict';

    describe('messagePanel', function () {

        var scope, compile, controller, elem;

        beforeEach(function () {
            module('common');

            inject(function ($rootScope, $compile, $httpBackend, $controller) { 
                compile = $compile;
                controller = $controller;
                $httpBackend.when('GET', 'common/directives/message-panel/message-panel.directive.html').respond(200, '');
                elem = angular.element('<message-panel></message-panel>');
                scope = $rootScope;
                compile(elem)(scope);
                scope.$digest();

            });
        });

        it('html template - loaded', function () {

            //TODO: Implement your complex directive spec logic here
            /*
            To test your directive, you need to create some html that would use your directive,
            send that through compile() then compare the results.
*/
            var htmlEl = '<message-panel></message-panel>';

            var element = compile(htmlEl)(scope);
            expect(element.html()).not.toBe(htmlEl);

        });

    });

})();
