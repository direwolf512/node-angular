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
   * config 配置
   */
  core.config(configure);

  configure.$inject = ['$locationProvider'];

  /* @ngInject */
  function configure ($locationProvider) {
    // 开启 html5 mode 模式
    $locationProvider.html5Mode(true).hashPrefix('!');

  }
})();
