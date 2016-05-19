(function () {
  'use strict';

  angular
    .module('project-si')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
          abstract: true,
          templateUrl: '/index.html'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/components/home/_home.html'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: 'app/components/contact/_contact.html'
      })
      .state('enterprise', {
        url: '/enterprise',
        templateUrl: 'app/components/enterprise/_enterprise.html'
      })
      .state('term-of-service', {
        url: '/term-of-service',
        templateUrl: 'app/components/enterprise/_term_of_service.html'
      })
      .state('privacy-policy', {
        url: '/privacy-policy',
        templateUrl: 'app/components/enterprise/_privacy_policy.html'
      })
      .state('account', {
        url: '/account',
        templateUrl: 'app/components/account/_account.html'
      })
      .state('account/tab', {
        url: '/account/:tab',
        templateUrl: 'app/components/account/_account.html'
      });

    $urlRouterProvider.otherwise('/');
    //$locationProvider.html5Mode(true);
  }

}) ();
