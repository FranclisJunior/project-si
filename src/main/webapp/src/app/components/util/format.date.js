(function () {
  "use strict";

  angular
    .module('project-si')
    .directive('formatDate', formatDate);

  function formatDate() {
    return {
      require: 'ngModel',
      link: function (scope, elem, attr, modelCtrl) {
        modelCtrl.$formatters.push(function (modelValue) {
          return new Date(modelValue);
        })
      }
    }
  }

})();
