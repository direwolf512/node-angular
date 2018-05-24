/**
 * @fileOverview
 * @author ISS
 */

(function () {
  'use strict';

  var core = angular.module('app.core');

  /**
   * config 配置 : toastr通知
   */
  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];

  /* @ngInject */
  function toastrConfig (toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  /**
   * config 配置 : 跨域
   */
  core.config(jsonpConfig);

  jsonpConfig.$inject = ['$sceDelegateProvider'];

  function jsonpConfig ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://localhost:3000'
    ]);
  }

  /**
   * config 配置
   */
  core.config(configure);

  configure.$inject = ['$locationProvider', '$routeProvider', 'routehelperConfigProvider'];

  /* @ngInject */
  function configure ($locationProvider, $routeProvider, routehelperConfigProvider) {
    // 开启 html5 mode 模式
    $locationProvider.html5Mode(true).hashPrefix('!');
    routehelperConfigProvider.$routeProvider = $routeProvider;

    var resolveAlways = {
      /* @ngInject */
      // ready: function(dataservice) {
      //  return dataservice.ready();
      // }
      ready: ['dataservice', function (dataservice) {
        return dataservice.ready();
      }]
    };
    routehelperConfigProvider.resolveAlways = resolveAlways;
  }
})();
