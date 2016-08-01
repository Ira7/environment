(function () {
    'use strict';

    describe('moeWizardContent', function () {

        var compile, $scope, $q, deferred;
        var mockd3Service = {};
        beforeEach(function () {
            module('toxins');
            module('moeDialog');
            module('common');

            inject(function (_$rootScope_, _$compile_, $controller, _$q_, toxinsService) {
                $q = _$q_;
                $scope = _$rootScope_.$new();
               // compile = $compile;

                deferred = $q.defer();

                // Use a Jasmine Spy to return the deferred promise
                spyOn(toxinsService, 'loadDataByURL').and.returnValue(deferred.promise);

                $controller('MoeWizardContentController', {
                    $scope: $scope,
                    toxinsService: toxinsService
                });
            });
        });

        it('should resolve promise', function () {
            // Setup the data we wish to return for the .then function in the controller
            deferred.resolve([{ id: 1 }, { id: 2 }]);

            // We have to call apply for this to work
            $scope.$apply();

            // Since we called apply, not we can perform our assertions
            expect($scope.results).not.toBe(undefined);
            expect($scope.error).toBe(undefined);
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
