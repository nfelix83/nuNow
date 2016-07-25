angular.module('buzz', [
  'ui.router',
  'buzz.main',
  'buzz.services'
])
.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: '../templates/_main.html',
      controller: 'MainController'
    })
})
