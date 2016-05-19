(function() {
  "use strict";

  angular
    .module("project-si")
    .factory("AuthService", AuthService);

  /** @ngInject */
  function AuthService($rootScope, $http, apiAddress) {
    var USER_NOTIFY = "USER";
    var MENU_NOTIFY = "MENU";

    var notifyUserChanged = function (user) {
      $rootScope.$broadcast(USER_NOTIFY, {
        user: user
      })
    };

    var onNotifyUserChanged = function ($scope, handler) {
      $scope.$on(USER_NOTIFY, function (event, notify) {
        handler(notify.user)
      })
    };

    var openAuthModal = function (menu) {
      $rootScope.$broadcast(MENU_NOTIFY, {
        menu: menu
      })
    };

    var onOpenAuthModal = function ($scope, handler) {
      $scope.$on(MENU_NOTIFY, function (event, notify) {
        handler(notify.menu)
      })
    };

    var registerUser = function(user) {
      return $http.post(apiAddress + "/signup", user);
    };

    var login = function (auth) {
      return $http.post(apiAddress + "/auth", auth);
    };

    var logout = function () {
      return $http.post(apiAddress + "/logout");
    };

    return {
      notifyUserChanged: notifyUserChanged,
      onNotifyUserChanged: onNotifyUserChanged,
      openAuthModal: openAuthModal,
      onOpenAuthModal: onOpenAuthModal,
      register: registerUser,
      login: login,
      logout: logout
    };
  }
})();
