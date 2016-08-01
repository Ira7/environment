(function () {
    'use strict';

    /* JAVASCRIPT */

    /**
     * PortfolioList Object/function
     */
    function PortfolioList() {

        /***************** PRIVATE *******************/

        /* @ngInject */
        function PortfolioListController(portfolioService) {
            var vm = this;

            vm.model = portfolioService.model;
            
            vm.setPortfolio = function (portfolio){
                portfolioService.setPortfolio(portfolio);
            };

        }

        /**
         * Directives link function
         */
        function _link(scope, iElem, iAttrs, controllers) {
            // add logic here
        }

        /****************** PUBLIC *******************/
        var directive = {
            restrict: 'E',
            scope: {

            },
            templateUrl: 'common/directives/portfolio-list/portfolio-list.directive.html',
            link: _link,
            controller: PortfolioListController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

    }

    /* ANGULAR */
    angular
        .module('common')
        .directive('portfolioList', PortfolioList);

})();
