/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell', Shell);

  Shell.$inject = ['$route', '$location', 'routehelper'];
  function Shell ($route, $location, routehelper) {
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
      window.localStorage.setItem('userId', '');
      //document.cookie = "userId=" + null + ';path=/;';
      location.href = '/';
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