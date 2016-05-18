(function () {
  "use strict";

  angular
    .module("we-are")
    .factory("FacebookService", FacebookService);

  /** @ngInject */
  function FacebookService(Facebook) {

    var getLoginStatus = function(callback) {
      Facebook.getLoginStatus(function (response) {
        callback(response);
      });
    };

    var login = function(callback) {
      Facebook.login(function (response) {
        callback(response);
      }, {scope: 'email, public_profile, user_location, user_birthday', return_scopes: true});
    };

    var me = function(callback) {
      Facebook.api('/me', {fields: 'email, name, location, birthday'}, function (response) {
          callback(response);
      });
    };

    var logout = function() {
      Facebook.logout();
    };

    return {
      getLoginStatus: getLoginStatus,
      login: login,
      me: me,
      logout: logout
    }
  }
})();


