(function () {
  "use strict";

  angular
    .module("we-are")
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
