(function () {
  "use strict";

  angular
    .module("project-si")
    .service("AccountService", AccountService);

  /** @ngInject */
  function AccountService($http, apiAddress) {

    var updateUser = function(user) {
      return $http.put(apiAddress +"/user/" + user.id, user);
    };

    var changeUserPicture = function (userId, picture, pictureName) {
      var fd = new FormData();
      fd.append('upload', picture, pictureName);
      return $http.post(apiAddress + "/user/" + userId + "/picture", fd,
        {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }
      );
    };

    var changePassword = function (userId, passwordObject) {
      return $http.put(apiAddress +"/user/" + userId, passwordObject);
    };

    return {
      updateUser: updateUser,
      changeUserPicture: changeUserPicture,
      changePassword: changePassword
    }

  }
})();
