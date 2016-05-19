(function () {
  'use strict';
  angular
    .module('project-si')
    .service("HomeService", HomeService);

  /** @ngInject */
  function HomeService($http, apiAddress) {

    var getSponsors = function () {
      return $http.get(apiAddress + "/sponsor");
    };

    var getBanners = function () {
      return $http.get(apiAddress + "/banner");
    };

    return {
      getSponsors: getSponsors,
      getBanners: getBanners
    }

  }
})();
