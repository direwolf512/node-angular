/**
 * @fileOverview
 * @author ISS
 */

(function () {
  'use strict';

  angular
    .module('app.core')
    .run(authLoggedIn);

  authLoggedIn.$inject = ['$rootScope', '$location', 'dataservice'];

  function authLoggedIn ($rootScope, $location, dataservice) {
    var path = $location.path();
    $rootScope.user = {
      getUserPromise: null
    };
    $rootScope.ifJoin = window.localStorage.getItem('userId') ? true : false;
    $rootScope.id = window.localStorage.getItem('userId') ? window.localStorage.getItem('userId') : null;
    if (!$rootScope.ifJoin) {
      if (path === '/article/add') {
        window.location.href = '/';
      }
    } else {
      dataservice.getUser($rootScope.id).then(function (data) {
        var _data = data.data;
        angular.extend($rootScope.user, _data);
      });
    }
  }
})();

