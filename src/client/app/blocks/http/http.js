/**
 * @fileOverview
 * @author ISS
 */

(function () {
  'use strict';

  angular
    .module('blocks.http')
    .factory('auth.httpInterceptor', authHttpInterceptor);

  authHttpInterceptor.$inject = ['$q', 'logger'];

  function authHttpInterceptor ($q, logger) {
    var service = {
      'responseError': responseError
    };

    return service;

    function responseError (rejection) {
      if (rejection.status === 401) {
        logger.info('未登录')
      } else if (rejection.status > 404 && rejection.status < 600) {
        logger.error(rejection.data.msg);
      }

      return $q.reject(rejection);
    }
  }
})();