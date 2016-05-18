(function() {
  'use strict';

  angular
    .module('we-are')
    .directive('footerSocial', footerSocial);

  /** @ngInject */
  function footerSocial() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/footer/_footer.html',
      bindToController: true
    };
  }

})();
