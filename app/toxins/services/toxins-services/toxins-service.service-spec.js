(function () {
    'use strict';

    describe('toxinsService', function () {

        var toxinsService, moeDialog, dataService, fakeData;

        beforeEach(function () {
            module('moeDialog');
            module('toxins');

                //rest = new ToxinsService();
                //post = new loadSitePermit(rest);
        
            inject(function (_toxinsService_, _moeDialog_, _dataService_, $q, ENV) {
                toxinsService = _toxinsService_;
                dataService = _dataService_;

                fakeData = {
                    url: ENV.dataEndpoint+'data/listSite.json',
                    data: 'fake data..'
                };
               // spyOn(toxinsService, 'loadPermitSites').and.callThrough();
                spyOn(toxinsService, 'loadPermitSites').and.callFake(function () {
                    var deferred = $q.defer();
                    deferred.resolve(fakeData);
                    return deferred.promise;
                });

            });
           

            });
            it('should fetch the listing', function () {
                expect(toxinsService.loadPermitSites).toHaveBeenCalled();
        });

            //it('will receive the list of posts from the rest service', function () {
            //    var posts = [
            //    {
            //        nameSite: "אתר סביבתי 1",
            //        numberSite: "123456",
            //        permitNumber: "123-456-hh",
            //        PermitExpirationDate: "10/05/2020",
            //        status: "draft"
            //    },
            //    {
            //        nameSite: "אתר סביבתי 2",
            //        numberSite: "987654",
            //        permitNumber: "423-455-f",
            //        PermitExpirationDate: "12/06/2018",
            //        status: "new"
            //    }
            //    ];

        //    });


        it('should be defined', function () {

            //TODO: Implement your service spec logic here
            expect(toxinsService.loadData).toBeDefined();
            expect(toxinsService.setStep).toBeDefined();
            expect(toxinsService.getListKey).toBeDefined();
            expect(toxinsService.saveDraft).toBeDefined();
            expect(toxinsService.loadDataByURL).toBeDefined();
            expect(toxinsService.loadSitePermit).toBeDefined();
            expect(toxinsService.submit).toBeDefined();
            expect(toxinsService.getDraft).toBeDefined();

        });

    });

})();
