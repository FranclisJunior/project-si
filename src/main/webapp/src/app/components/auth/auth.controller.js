(function () {
  "use strict";

  angular
    .module("project-si")
    .controller("AuthController", AuthController);

  /** @ngInject */
  function AuthController($scope, $location, toastr, AuthService, UserService, SessionService) {

    var vm = this;

    var AUTH_MODAL = "#auth-modal";

    AuthService.onNotifyUserChanged($scope, function(user) {
      vm.user = user;
      SessionService.setAuthenticatedUser(vm.user);
    });

    AuthService.onOpenAuthModal($scope, function (menu) {
      vm.showAuthModal(menu);
    });

    var redirectToAccountPage = function () {
      if (vm.user.matriculation === null) {
        angular.element("#navBarItems li a").each(function(){
          angular.element(this).removeClass("navbar-active");
        });
        $location.path("/account");
      }
      angular.element(AUTH_MODAL).hide("slide");
    };

    vm.user = SessionService.getAuthenticatedUser();
    vm.authActiveTab = undefined;
    vm.auth = {};
    vm.newUser = {};

    vm.showAuthModal = function (menu) {
      vm.authActiveTab = menu;
      angular.element(AUTH_MODAL).show("slide");
    };

    vm.closeAuthModal = function () {
      vm.authActiveTab = undefined;
      angular.element(AUTH_MODAL).hide("slide");
    };

    vm.login = function (auth) {
      AuthService.login(auth)
        .then(function(result) {
          vm.user = result.data;
          SessionService.setAuthenticatedUser(vm.user);
          redirectToAccountPage();
          vm.auth = {};
        }, function (error) {
          if(error.status === 401) {
            toastr.error("Email ou senha invalida", "Erro");
          } else {
            toastr.error("Tente novamente, se o erro pesistir entre em contato com o administrador", "Erro");
          }
        });
    };

    vm.register = function (user) {
      user.role = "USER";
      UserService.createUser(user)
        .then(function(result) {
          vm.user = result.data;
          var auth = {
            login: user.email,
            password: user.password
          };
          vm.login(auth);
        }, function(error) {
            toastr.error(error.data.message);
        });
    };

    vm.logout = function() {
      vm.user = undefined;
      SessionService.clear();
      AuthService.logout();
    };
  }
})();
