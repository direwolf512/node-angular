/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.users')
    .run(appRun);

  appRun.$inject = ['routehelper'];

  /* @ngInject */
  function appRun (routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes () {
    return [
      {
        url: '/users',
        config: {
          templateUrl: 'app/users/index.html',
          controller: 'UsersAll',
          controllerAs: 'vm',
          title: '全部用戶',
          settings: {
            nav: 2,
            content: '全部用戶'
          }
        }
      }
    ];
  }
})();
