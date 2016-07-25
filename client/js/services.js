angular.module('buzz.services', [])

.factory('Fetch', function($http) {
  let fetchReddit = () => {
    return new Promise((res, rej) => {
      $http({
        method: 'GET',
        url: 'fetch/reddit'
      }).then(function success(data) {
        res(data.data);
      });
    });
  };

  return {
    fetchReddit: fetchReddit
  };
})
