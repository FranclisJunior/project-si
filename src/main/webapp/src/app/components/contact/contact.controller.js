(function () {
  "use strict";

  angular
    .module("project-si")
    .controller("ContactController", ContactController);

  /** @ngInject */
  function ContactController(toastr, vcRecaptchaService, captchaKey, UtilService, contactService) {

    UtilService.hideActiveMenu();
    UtilService.toTopPage();

    var vm = this;

    var msgSentTitle = "Mensagem Enviada";
    var msgSentBody = "Em breve entraremos em contato com você por email";
    var captchaId = undefined;

    vm.captchaKey = captchaKey;

    vm.issues = ["Duvida", "Sugestão", "Outro"];

    vm.contact = {};

    vm.setResponse = function () {
      vm.captchaValid = true
    };
    vm.setWidgetId = function (widgetId) {
      captchaId = widgetId;
    };
    vm.cbExpiration = function() {
      vcRecaptchaService.reload(captchaId);
      vm.captchaValid = false;
    };

    vm.send = function() {
      contactService.send(vm.contact).then(function () {
        vm.captchaValid = false;
        vm.contact = {};
        toastr.success(msgSentBody, msgSentTitle);
        vcRecaptchaService.reload(captchaId);
      });

    };
  }


})();
