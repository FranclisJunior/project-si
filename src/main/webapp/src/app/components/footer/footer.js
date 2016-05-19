(function() {
  'use strict';

  angular
    .module('project-si')
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
