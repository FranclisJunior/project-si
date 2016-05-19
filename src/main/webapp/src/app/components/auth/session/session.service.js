(function () {
  "use strict";
  angular
    .module("project-si")
    .service("SessionService", SessionService);

  /* @ngInject */
  function SessionService($location, appSession) {
    "use strict";

    var session = appSession();

    this.set = function (property, value) {
      session.set(property, value);
    };

    this.get = function (propertyName) {
      return session.get(propertyName);
    };

    this.setAuthenticatedUser = function (user) {
      session.set("authenticated-user", user);
    };

    this.getAuthenticatedUser = function (callback) {
      if (this.hasSession()) {
        var user = session.get("authenticated-user");
        if (angular.isFunction(callback)) {
          callback(user);
        }
        return user;
      }
      return undefined;
    };

    this.hasSession = function () {
      return session.hasSession();
    };

    this.isLogged = function () {
      return angular.isDefined(this.get("authenticated-user"));
    };

    this.isAdmin = function () {
      var roles = this.get("authenticated-user").role;
      var isAdmin = false;
      angular.forEach(roles, function (role) {
        if (role.id === 2 || role.id === 3 || role.id === 4) {
          isAdmin = true;
        }
      });
      return isAdmin;
    };

    this.clear = function () {
      session.clear();
      $location.path("/home");
    };

  }
})();
