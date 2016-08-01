(function () {
    'use strict';

    describe('moeSites', function () {

        var scope, compile, element;

        beforeEach(function () {
         
            module('moeSites');

            inject(function ($rootScope, $compile, $httpBackend, $templateCache) {
                scope = $rootScope.$new();
                compile = $compile;
                $httpBackend.when('GET', 'moe-sites/directives/moe-sites/moe-sites.directive.html').respond(200, '');
               // $templateCache.put('moe-sites-list/directives/moe-sites-list/moe-sites-list.directive.html', '.<moe-sites-list/>');

                scope.list = [
              {
                  nameSite: "test 1",
              },
              {
                  nameSite: "test 2",
              }
                ];
                // element = compile('<div mydirective name="name">hi</div>')(scope);
                element = angular.element('<div><moe-sites list="list"></moe-sites></div>');//<moe-sites-list list="list"></moe-sites-list>
                element = compile(element)(scope);
                $rootScope.$digest();

            });
            
        });

        it('should ...', function () {

            //TODO: Implement your complex directive spec logic here
            /*
            To test your directive, you need to create some html that would use your directive,
            send that through compile() then compare the results.
  */
            console.log(element.html());
            expect(element.text()).toContain("test");
           // expect(element.text()).toBe('hello, world');
          

        });

    });

})();
