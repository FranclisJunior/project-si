(function () {
  'use strict';

  angular
    .module('we-are')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, $authProvider, apiAddress) {

    $authProvider.loginUrl = apiAddress + '/authenticate';

    $stateProvider
      .state('app', {
          abstract: true,
          templateUrl: '/index.html'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/components/home/_home.html'
      })
      .state('tournaments/choose-game', {
        url: '/tournaments/choose-game',
        templateUrl: 'app/components/tournament/choose-game/_tournament_choose_game.html'
      })
      .state('tournaments/game', {
        url: '/tournaments/game/:gameId',
        templateUrl: 'app/components/tournament/choose-platform/_tournament_choose_platform.html'
      })
      .state('tournaments/game/platform', {
        url: '/tournaments/game/:gameId/platform/:platformId',
        templateUrl: 'app/components/tournament/_tournament_list.html'
      })
      .state('tournament/id', {
        url: '/tournament/:tournamentId',
        templateUrl: 'app/components/tournament/_tournament_view.html'
      })
      .state('tournament/id/register', {
        url: '/tournament/:tournamentId/register',
        templateUrl: 'app/components/tournament/register/_tournament_register.html'
      })
      .state('top-videos', {
        url: '/top-videos',
        templateUrl: 'app/components/top-videos/_top_videos.html'
      })
      .state('ranking', {
        url: '/ranking',
        templateUrl: 'app/components/ranking/_ranking.html'
      })
      .state('profile/team', {
        url: '/profile/team/:teamId',
        templateUrl: 'app/components/profile/_profile_team.html'
      })
      .state('profile/user', {
        url: '/profile/user/:userId',
        templateUrl: 'app/components/profile/_profile_user.html'
      })
      .state('news', {
        url: '/news/:slug',
        templateUrl: 'app/components/news/_news.html'
      })
      .state('list-news', {
        url: '/news',
        templateUrl: 'app/components/news/_list_news.html'
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
      })
      .state('account/team', {
        url: '/account/:tab/:teamId',
        templateUrl: 'app/components/account/_account.html'
      })
      .state('match', {
        url: '/match/:matchId',
        templateUrl: 'app/components/tournament/_tournament_view_match.html'
      })
      .state('match/admin', {
        url: '/match/:matchId/admin',
        templateUrl: 'app/components/match/_match_admin.html'
      })
      .state('admin/tournament', {
        url: '/admin/tournament',
        templateUrl: 'app/components/tournament-admin/_tournament_list.html'
      })
      .state('admin/tournament/id', {
        url: '/admin/tournament/:tournamentId',
        templateUrl: 'app/components/tournament-admin/_tournament_view.html'
      })
      .state('seed', {
        url: '/admin/seed',
        templateUrl: 'app/components/tournament-admin/_tournament_seed.html'
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

  }

}) ();
