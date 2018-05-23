/**
 * @fileOverview
 * @author bian17888 16/7/14 10:09
 */

(function () {
  'use strict';

  angular
    .module('blocks.exception')
    .factory('exception', exception);

  exception.$inject = ['logger'];

  /* @ngInject */
  function exception (logger) {
    var service = {
      catcher: catcher
    };
    return service;

    function catcher (message) {
      return function (reason) {
        logger.warning(message, reason);
      };
    }
  }
})();
