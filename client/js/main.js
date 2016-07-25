angular.module('buzz.main', [])

.controller('MainController', function($scope, Fetch) {
  Fetch.fetchReddit().then(content => {console.log(content)});
});
