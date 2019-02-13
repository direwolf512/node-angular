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
      }, {
        url: '/users/register',
        config: {
          templateUrl: 'app/users/register/index.html',
          controller: 'UsersRegister',
          controllerAs: 'vm',
          title: '注册'
        }
      }, {
        url: '/users/login',
        config: {
          templateUrl: 'app/users/login/index.html',
          controller: 'UsersLogin',
          controllerAs: 'vm',
          title: '登录'
        }
      }, {
        url: '/users/detail/:id',
        config: {
          templateUrl: 'app/users/detail/index.html',
          controller: 'UserDetail',
          controllerAs: 'vm',
          title: '个人主页'
        }
      }
    ];
  }
})();
