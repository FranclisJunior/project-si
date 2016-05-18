(function() {
  'use strict';

  angular
    .module('we-are')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('Project SI Started');
  }

})();
