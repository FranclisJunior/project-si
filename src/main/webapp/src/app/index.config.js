(function () {
  'use strict';

  angular
    .module('project-si')
    .config(config)
    .config(facebookConfig)
    .config(toastConfig)
    .config(configProvider)
    .config(configDateTimePicker);

  /** @ngInject */
  function config($logProvider) {
    $logProvider.debugEnabled(true);
  }

  /** @ngInject */
  function facebookConfig(FacebookProvider) {
    var myAppId = '1681868028752244';
    FacebookProvider.setAppId(myAppId);
  }

  /** @ngInject */
  function toastConfig(toastrConfig) {
    angular.extend(toastrConfig, {
      autoDismiss: true,
      closeButton: true,
      maxOpened: 2,
      newestOnTop: true,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      tapToDismiss: true,
      timeOut: 5000
    });
  }

  /** @ngInject */
  function configProvider($httpProvider) {
    $httpProvider.interceptors.push("authInterceptor");
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

  /** @ngInject */
  function configDateTimePicker($datepickerProvider, $timepickerProvider) {
    angular.extend($timepickerProvider.defaults, {
      timeFormat: 'HH:mm',
      length: 7
    });
    angular.extend($datepickerProvider.defaults, {
      dateFormat: 'dd/MM/yyyy',
      startWeek: 1
    });
  }

})();
