/**
 * @fileOverview
 * @author ISS
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
          title: '全部文章',
          settings: {
            nav: 1,
            content: '全部文章'
          }
        }
      }, {
        url: '/article/add',
        config: {
          templateUrl: 'app/article/add/index.html',
          controller: 'ArticleAdd',
          controllerAs: 'vm',
          title: '添加文章'
        }
      }, {
        url: '/article/add/:id',
        config: {
          templateUrl: 'app/article/add/index.html',
          controller: 'ArticleAdd',
          controllerAs: 'vm',
          title: '編輯文章'
        }
      }, {
				url: '/article/:id',
				config: {
					templateUrl: 'app/article/detail/index.html',
					controller: 'ArticleDetail',
					controllerAs: 'vm',
					title: '详情'
				}
			}
    ];
  }
})();
