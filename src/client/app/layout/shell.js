/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell', Shell);

  Shell.$inject = ['$route', '$location', 'routehelper', '$uibModal'];
  function Shell ($route, $location, routehelper, $uibModal) {
    var vm = this;
    vm.ifJoin = window.localStorage.getItem('userId') ? window.localStorage.getItem('userId') : null;
    vm.logOut = logOut;
    var routes = routehelper.getRoutes();
    vm.navRoutes = [];
    vm.isCurrent = isCurrent;

    active();

    function active () {
      getNavRoutes();
    }

    function logOut () {
      $uibModal.open({
        size: 'confirm-dialog-modal',
        animation: true,
        templateUrl: 'app/widgets/dialogs/confirm/index.html',
        controller: 'confirmDialog',
        controllerAs: '$ctrl',
        backdrop: 'static',
        resolve: {
          data: {
            title: '注销提示',
            con: '您确定要注销当前账号吗？',
            btnSure: {
              name: '注销'
            },
            btnRefuse: {
              name: '取消'
            }
          }
        }
      })
    }


    /**
     * 初始化导航
     * @returns {void}
     */
    function getNavRoutes () {
      vm.navRoutes = routes.filter(function (r) {
        return r.settings && r.settings.nav;
      }).sort(function (r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function isCurrent (route) {
      if (!route.title || !$route.current || !$route.current.title) {
        return '';
      }
      var menuName = route.title;
      vm.headerStyle = $location.path();
      var className = '';
      className = $route.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
      return className;
    }
  }
})();