(function () {
  "use strict";

  angular
    .module("we-are")
    .factory("appSession", AppSession);

  /* @ngInject */
  function AppSession($window) {
    "use strict";

    var appName = "we-are";
    var appStores = {};
    var api;

    if ($window.localStorage) {
      api = {
        set: function (name, value) {
          $window.localStorage.setItem(name, angular.toJson(value));
        },
        get: function (name) {
          var value = $window.localStorage.getItem(name);
          try {
            return value ? angular.fromJson(value) : {};
          } catch (exception) {
            $window.console.log("Parse error for localStorage " + name);
            return {};
          }
        },
        clear: function () {
          $window.localStorage.clear();
        }
      };
    }

    if (!api) {
      throw new Error("Could not find suitable storage");
    }

    return function () {
      var appStorage = appStores[appName];

      var update = function () {
        api.set(appName, appStorage);
      };

      var clear = function () {
        appStorage = {};
        api.clear(appName);
      };

      var hasSession = function () {
        if (angular.isUndefined(appStorage)) {
          return false;
        }
        return angular.isDefined(appStorage[btoa("authenticated-user")]);
      };

      if (!appStorage) {
        appStorage = api.get(appName);
        appStores[appName] = appStorage;
        update();
      }

      return {
        get: function (property) {
          try {
          if (angular.isUndefined(appStorage)) {
            return undefined;
          }
          var propertyEncode = btoa(property);
          var propertyDecoded = atob(appStorage[propertyEncode]);
          if (propertyDecoded === 'undefined' || angular.isUndefined(propertyDecoded)) {
            return undefined;
          }
          return angular.fromJson(propertyDecoded);
          } catch (exception) {
            return undefined;
          }
        },
        set: function (name, value) {
          var propertyEncode = btoa(name);
          appStorage[propertyEncode] = btoa(angular.toJson(value));
          update();
        },
        clear: clear,
        hasSession: hasSession
      };
    };
  }

})();
