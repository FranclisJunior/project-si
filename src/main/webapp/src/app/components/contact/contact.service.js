(function () {
  "use strict";

  angular
    .module("project-si")
    .service("contactService", contactService);

  /** @ngInject */
  function contactService($http, apiAddress) {

    return {
      send: send
    };

    function send(contact) {
      return $http.post(apiAddress + "/contact", contact);
    }
  }
})();
