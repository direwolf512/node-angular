/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('blocks.router')
    .provider('routehelperConfig', routehelperConfig)
    .factory('routehelper', routehelper);

  routehelper.$inject = ['$location', '$rootScope', '$route', 'logger', 'routehelperConfig'];

  function routehelperConfig () {
    var self = this;
    this.$get = function () {
      return {
        config: self
      }
    }
  }

  function routehelper ($location, $rootScope, $route, logger, routehelperConfig) {
    var handlingRouteChangeError = false,
      routeCounts = {
        errors: 0,
        changes: 0
      },
      routes = [],
      $routeProvider = routehelperConfig.config.$routeProvider,
      service = {
        configureRoutes: configureRoutes,
        getRoutes: getRoutes,
        routeCounts: routeCounts
      };
    init();

    return service;

    function configureRoutes (routes) {
      routes.forEach(function (route) {
        route.config.resolve = angular.extend(route.config.resolve || {}, routehelperConfig.resolveAlways);
        $routeProvider.when(route.url, route.config);
      });
      $routeProvider.otherwise({
        redirectTo: '/'
      });
    }

    function getRoutes () {
      var _routes = $route.routes;
      routes = [];
      for (var prop in _routes) {
        if (_routes.hasOwnProperty(prop)) {
          var route = _routes[prop],
            isRoute = !!route.title;
          if (isRoute) {
            routes.push(route);
          }
        }
      }
      return routes;
    }

    function init () {
      updateDocTitle();
      handleRoutingErrors();
    }

    function updateDocTitle () {
      $rootScope.$on('$routeChangeSuccess', function (event, current) {
        handlingRouteChangeError = false;
        routeCounts.changes++;
        $rootScope.title = (current.title || '')
      });
    }

    function handleRoutingErrors () {
      $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        var destination = '';
        var msg = '';
        if (handlingRouteChangeError) {
          return;
        }
        handlingRouteChangeError = true;
        routeCounts.errors++;
        destination = (current && (current.title || current.name || current.loadedTemplateUrl)) || 'unknown target';
        msg = 'Error routing to ' + destination + '.' + (rejection.msg || '');

        logger.warning(msg, [current]);
        $location.path('/');
      })
    }
  }


})();
