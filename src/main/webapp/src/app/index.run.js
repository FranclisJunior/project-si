(function() {
  'use strict';

  angular
    .module('project-si')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
    $log.debug('Project SI Started');
  }

})();
