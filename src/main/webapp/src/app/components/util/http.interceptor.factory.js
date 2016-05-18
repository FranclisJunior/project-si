(function () {
  'use strict';

  angular.module('we-are')
    .factory("authInterceptor", authInterceptor);

  /** @ngInject */
  function authInterceptor($q, $location,  $timeout, $injector, SessionService, FacebookService) {

    function responseErrorInterception(rejection) {
      if ((rejection.status === 401 || rejection.status === 400) &&
          (rejection.data.error === 'token_expired' || rejection.data.error === 'token_not_provided' || rejection.data.error === 'token_invalid')) {
        var $auth = $injector.get('$auth');
        var toaster = $injector.get('toastr');
        var AuthService = $injector.get('AuthService');

        SessionService.clear();
        $auth.logout();
        FacebookService.getLoginStatus(function(response) {
          if (response.status == 'connected') {
            FacebookService.logout();
          }
        });
        $location.path("/home");
        toaster.clear();
        AuthService.notifyUserChanged(undefined);
        $timeout(function () {
          toaster.info("Sua seção expirou, entre novamente", "Atenção");
          AuthService.openAuthModal('login');
        }, 4000)
      }
      return $q.reject(rejection);
    }

    return {
      responseError: responseErrorInterception
    };
  }

})();
