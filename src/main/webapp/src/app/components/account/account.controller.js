(function () {
  "use strict";

  angular
    .module("we-are")
    .controller("AccountController", AccountController);

  /** @ngInject */
  function AccountController($stateParams, $scope, $location, $timeout, AccountService, AuthService, SessionService, UtilService, toastr) {


    if(!SessionService.isLogged()) {
      $location.path("/home");
      toastr.info("Para acessar essa pagina é preciso está logado", "Atenção");
      $timeout(function () {
        AuthService.openAuthModal('login');
      }, 1000)
    }

    var vm = this;

    var MODAL_CHOOSE_PICTURE = "#modalTeamPicture";
    var MODAL_CHANGE_PASSWORD = "#modalChangePassword";
    var BUTTON_SAVE_PICTURE = "#btSavePicture";
    var INPUT_PICTURE = "#pictureInput";

    var loadCropImage = function () {
      var handleFileSelect = function (evt) {
        var file = evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          $scope.$apply(function () {
            vm.picture = evt.target.result;
          });
        };
        reader.readAsDataURL(file);
      };
      angular.element(INPUT_PICTURE).on('change', handleFileSelect);
    };

    vm.picture = undefined;
    vm.croppedPicture='';
    vm.userPassword = undefined;
    vm.accountActiveTab = $stateParams.tab;

    if(angular.isUndefined(vm.accountActiveTab)) {
      vm.accountActiveTab = "me";
    }

    vm.ufs = [ "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA",
               "PE", "PI", "PB", "PR", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    vm.user = SessionService.getAuthenticatedUser();

    vm.updateUser = function () {
      AccountService.updateUser(vm.user)
        .then(function(result) {
          vm.user = result.data;
          AuthService.notifyUserChanged(vm.user);
          toastr.success("Dados atualizados");
        }, function(error) {
          toastr.error(error.data.error.message);
        })
    };

    vm.changeUserPicture = function () {
      var file = UtilService.dataUriToFile(vm.croppedPicture);
      var fileName = "picture." + vm.croppedPicture.split(',')[0].split(':')[1].split(';')[0].split('/')[1];
      angular.element(BUTTON_SAVE_PICTURE).button('loading');

      AccountService.changeUserPicture(vm.user.id, file, fileName)
        .then(function (result) {
          vm.user.picture = result.data.picture;
          AuthService.notifyUserChanged(vm.user);
          toastr.success("Foto atualizada");
        }, function (error) {
          toastr.error(error.data.error.message, "Erro");
        }).finally(function () {
         vm.clearModalChoosePicture();
        });
    };

    vm.deleteUserPicture = function () {
      vm.user.picture = "none";
      vm.updateUser();
    };

    vm.changePassword = function () {
      AccountService.changePassword(vm.user.id, vm.userPassword)
        .then(function() {
          toastr.success("Senha atualizada");
        }, function(error) {
          if (error.data.error.status === 91) {
            toastr.error("Senha atual não confere");
          } else {
            toastr.error(error.data.error.message);
          }
        }).finally(function () {
          vm.clearModalChangePassword();
        })
    };

    vm.saveGameID = function () {
      toastr.info("Not implemented");
    };

    vm.showModalChangePassword = function () {
      angular.element(MODAL_CHANGE_PASSWORD).modal();
    };

    vm.showModalChoosePicture = function () {
      angular.element(MODAL_CHOOSE_PICTURE).modal();
      loadCropImage();
    };

    vm.clearModalChoosePicture = function () {
      vm.picture = undefined;
      var inputPicture = angular.element(INPUT_PICTURE);
      angular.element(MODAL_CHOOSE_PICTURE).modal('hide');
      angular.element(BUTTON_SAVE_PICTURE).button('reset');
      inputPicture.replaceWith(inputPicture.clone());
    };

    vm.clearModalChangePassword = function () {
      vm.userPassword = undefined;
      angular.element(MODAL_CHANGE_PASSWORD).modal("hide");
    }
  }

})();
