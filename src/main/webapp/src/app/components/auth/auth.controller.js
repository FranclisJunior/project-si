(function () {
  "use strict";

  angular
    .module("we-are")
    .controller("AuthController", AuthController);

  /** @ngInject */
  function AuthController($scope, $location, $auth, toastr, FacebookService, AuthService, SessionService) {

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
      if (vm.user.nickname === null) {
        angular.element("#navBarItems li a").each(function(){
          angular.element(this).removeClass("navbar-active");
        });
        $location.path("/account");
      }
      angular.element(AUTH_MODAL).hide("slide");
    };

    var loadFacebookProfile = function () {
      FacebookService.me(function (response) {
        vm.user = {};
        vm.user.email = response.email;
        vm.user.name = response.name;
        vm.user.city = response.location.name;
        vm.user.birthday = response.birthday;
        vm.user.fid = response.id;
        vm.user.password = response.id;
        vm.user.picture = "https://graph.facebook.com/v2.5/" + response.id + "/picture?width=300&height=300";

        var auth = {
          email: response.email,
          fid: response.id,
          password: response.id
        };
        $auth.login(auth) //Verifica se o usuario ja esta registrado no BD
          .then(function(result) {
            vm.user = result.data;
            SessionService.setAuthenticatedUser(vm.user);
            redirectToAccountPage();
          }, function (error) {
            if(error.status === 401) {
              vm.user.social_facebook = "www.facebook.com/" + vm.user.fid;
              vm.register(vm.user); //Caso nao esteja no BD manda registrar o usuario
            }
          })
      });
    };

    vm.user = SessionService.getAuthenticatedUser();
    vm.authActiveTab = undefined;
    vm.loginUser = {};
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
      $auth.login(auth)
        .then(function(result) {
          vm.user = result.data;
          SessionService.setAuthenticatedUser(vm.user);
          redirectToAccountPage();
          vm.loginUser = {};
        }, function (error) {
          if(error.status === 401) {
            toastr.error("Email ou senha invalida", "Erro");
          } else {
            toastr.error("Tente novamente, se o erro pesistir entre em contato com thiago@groweb.com.br", "Erro");
          }
        });
    };

    vm.register = function (user) {
      if (angular.isUndefined(user.picture)) {
        user.picture = "none";
      }

      AuthService.register(user)
        .then(function(result) {
          vm.user = result.data;
          var auth = {
            email: user.email,
            password: user.password,
            fid: user.fid
          };
          vm.login(auth);
      }, function(error) {
          if(error.data.error.status === 21){
            toastr.error("Já existe usuario com este email", "Erro")
          } else {
            toastr.error(error);
          }
      });
    };

    vm.logout = function() {
      vm.user = undefined;
      SessionService.clear();
      $auth.logout();
      FacebookService.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          FacebookService.logout();
        }
      });
    };

    vm.loginFacebook = function () {
      FacebookService.login(function (response) {
        if (response.status == 'connected') {
          loadFacebookProfile();
        }
      });
    };

    vm.registerFacebook = function () {
      FacebookService.login(function (response) {
        if (response.status == 'connected') {
          loadFacebookProfile();
        }
      });
    };

  }
})();
