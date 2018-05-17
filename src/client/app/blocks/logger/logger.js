/**
 * @fileOverview
 * @author ISS
 */

(function () {
  'use strict';

  angular
    .module('blocks.logger')
    .factory('logger', logger);

  logger.$inject = ['$log', 'toastr', 'config'];

  function logger ($log, toastr, config) {
    var service = {
      showToasts: true,
      error: error,
      info: info,
      success: success,
      warning: warning,
      log: $log.log
    };

    return service;

    function error (message, data, title) {
      toastr.error(message, title);
      $log.error('Error : ' + message, data);
    }

    function info (message, data, title) {
      if (config.debug) {
        toastr.info(message, title);
        $log.info('Info : ' + message, data);
      }
    }

    function success (message, data, title) {
      toastr.success(message, title);
      $log.info('Success : ' + message, data);
    }

    function warning (message, data, title) {
      if (config.debug) {
        toastr.warning(message, title);
        $log.warn('Warning : ' + message, data);
      } else {
        $log.warn('Warning : ' + message, data);
      }
    }

  }
})();