(function () {
  "use strict";

  angular
    .module("project-si")
    .service("UtilService", UtilService);

  /** @ngInject */
  function UtilService() {

    var hideActiveMenu = function () {
      angular.element("#navBarItems li a").each(function(){
        angular.element(this).removeClass("navbar-active");
      });
    };

    var toTopPage = function() {
      angular.element("html, body").animate({
        scrollTop: 0
      }, 400);
    };

    var dataURItoBlob = function (dataURI) {
      // convert base64/URLEncoded data component to raw binary data held in a string
      var byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
      else
        byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type:mimeString});
    };


    return {
      hideActiveMenu: hideActiveMenu,
      toTopPage: toTopPage,
      dataUriToFile: dataURItoBlob
    }
  }

})();
