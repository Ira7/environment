(function () {
    'use strict';

    describe('messageService', function () {

        var messageService;

        beforeEach(function () {
            module('common');

            inject(function (_messageService_) {
                messageService = _messageService_;
            });
        });

        it('should have clear() method', function () {
            expect(messageService.clear).toBeDefined();
        });
        it('should have setMessage() method', function () {
           expect(messageService.setMessage).toBeDefined();
        });

    });

})();
