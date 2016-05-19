(function () {
  'use strict';

  angular
    .module('project-si')
    .service('UserService', UserService);

  function UserService($http, apiAddress) {

    var createUser = function (user) {
      return $http.post(apiAddress + "/user", user);
    };

    var getUser = function (userId) {
      return $http.get(apiAddress + "/user/" + userId);
    };

    var updateUser = function (userId, user) {
      return $http.put(apiAddress + "/user/" + userId, user);
    };

    return {
      createUser: createUser,
      getUser: getUser,
      updateUser: updateUser
    }


  }

})();
