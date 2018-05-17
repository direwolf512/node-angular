/**
 * @fileOverview
 * @author ISS
 */

/**
 * @fileOverview
 * @author bian17888 16/5/11 21:19
 */

(function () {
  'use strict';

  angular
    .module('app.article')
    .run(appRun);

  appRun.$inject = ['routehelper'];

  /* @ngInject */
  function appRun (routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes () {

    return [
      {
        url: '/',
        config: {
          templateUrl: 'app/article/index.html',
          controller: 'Article',
          controllerAs: 'vm',
          title: '首页'
        }
      }, {
        url: '/article/all',
        config: {
          templateUrl: 'app/article/all/index.html',
          controller: 'ArticleAll',
          controllerAs: 'vm',
          title: '全部',
          settings: {
            nav: 1,
            content: '全部'
          }
        }
      }
    ];
  }
})();
