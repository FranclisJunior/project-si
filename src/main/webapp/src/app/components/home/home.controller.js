(function () {
  'use strict';

  angular
    .module('project-si')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(toastr, HomeService) {
    "use strict";

    var vm = this;

    vm.banners = [
      {
        name: "Campus IV",
        picture: "http://si.dcx.ufpb.br/wp-content/uploads/2015/12/wgiw.jpg",
        url: "https://www.facebook.com/si.ufpb"
      },
      {
        name: "Campus IV",
        picture: "http://si.dcx.ufpb.br/wp-content/uploads/2015/12/campus.jpg",
        url: "https://www.facebook.com/si.ufpb"
      }
    ];

  }
})();
