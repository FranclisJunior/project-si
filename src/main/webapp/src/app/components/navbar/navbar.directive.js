(function () {
  'use strict';

  angular
    .module('project-si')
    .directive('topNavBar', topNavBar);

  /** @ngInject */
  function topNavBar() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/_navbar.html',
      controller: NavBarController,
      controllerAs: 'navBarC',
      bindToController: true
    };
  }

  /** @ngInject */
  function NavBarController($state, $location, UtilService, screenSize, SessionService) {
    var navBarC = this;

    var tournamentsModal = "#tournaments-modal";
    var sideMenu = "#side-menu";

    var tabHome = "#tabHome";
    var tabTournaments = "#tabTournaments";
    var tabRanking = "#tabRanking";
    var tabTopVideos = "#tabTopVideos";

    var urlHome = "/home";
    var urlTournaments = "/tournaments";
    var urlRanking = "/ranking";
    var urlTopVideos = "/top-videos";

    var redirectPage = function () {
      if ($location.path() === "/" || $location.path() === "") {
        $location.path(urlHome);
        navBarC.setNavBarActive(tabHome);
      }
    };

    navBarC.hideNavBar = function() {
      angular.element(sideMenu).collapse('hide');
      UtilService.hideActiveMenu();
    };

    navBarC.clickTournaments = function(){
      if(screenSize.is('xs, sm')){
        angular.element(sideMenu).collapse('hide');
        $state.go('tournaments/choose-game');
      }
    };

    navBarC.setNavBarActive = function (tab) {
      UtilService.hideActiveMenu();

      if (tab) {
        angular.element(tab).addClass("navbar-active");
        angular.element(sideMenu).collapse('hide');
      } else {
        var urlActive = $location.path();

        if (urlActive.indexOf(urlHome) > -1) {
          angular.element(tabHome).addClass("navbar-active");
        } else if (urlActive.indexOf(urlTournaments) > -1) {
          angular.element(tabTournaments).addClass("navbar-active");
        } else if (urlActive.indexOf(urlRanking) > -1) {
          angular.element(tabRanking).addClass("navbar-active");
        } else if (urlActive.indexOf(urlTopVideos) > -1) {
          angular.element(tabTopVideos).addClass("navbar-active");
        }
      }
    };

    navBarC.showTournamentsModal = function () {
      angular.element(tournamentsModal).show();
      UtilService.hideActiveMenu();
      angular.element(tabTournaments).addClass("navbar-active");
    };

    navBarC.hideTournamentsModal = function() {
      angular.element(tournamentsModal).hide();
      navBarC.setNavBarActive();
    };

    navBarC.initNavBar = function () {
      navBarC.setNavBarActive();
      redirectPage();
    };

    navBarC.isAdmin = function () {
      if (SessionService.isLogged()) {
        return SessionService.isAdmin();
      }
      return false;
    };

  }

})();
