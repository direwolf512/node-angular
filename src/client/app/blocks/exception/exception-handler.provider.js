/**
 * @fileOverview
 * @author bian17888 17/01/11 18:17
 */

// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function () {
  'use strict';

  angular
    .module('blocks.exception')
    .provider('exceptionHandler', exceptionHandlerProvider)
    .config(config);


  /**
   * Must configure the exception handling
   * @return {void}
   */
  function exceptionHandlerProvider () {
    var self = this;
    this.config = {
      // eslint-disable-next-line
      appErrorPrefix: undefined
    };
    this.configure = function (appErrorPrefix) {
      self.config.appErrorPrefix = appErrorPrefix;
    };
    this.$get = function () {
      return {config: self.config};
    };
  }


  /**
   * Configure by setting an optional string value for appErrorPrefix.
   * Accessible via config.appErrorPrefix (via config value).
   * @param  {Object[]} $provide
   * @return {Object[]}
   * @ngInject
   */
  config.$inject = ['$provide'];

  /* @ngInject */
  function config ($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }

  /**
   * Extend the $exceptionHandler service to also display a toast.
   * @param  {Object} $delegate
   * @param  {Object} exceptionHandler
   * @param  {Object} logger
   * @return {Function} the decorated $exceptionHandler service
   */
  extendExceptionHandler.$inject = ['$delegate', 'logger'];

  /* @ngInject */
  function extendExceptionHandler ($delegate, logger) {
    return function (exception, cause) {
      //var appErrorPrefix = exceptionHandler.config.appErrorPrefix;
      //exception.message = appErrorPrefix + exception.message;
      var errorData = {exception: exception, cause: cause};

      $delegate(exception, cause);
      /**
       * Could add the error to a service's collection,
       * add errors to $rootScope, log errors to remote web server,
       * or log locally. Or throw hard. It is entirely up to you.
       * throw exception;
       *
       * @example
       *     throw { message: 'error message we added' };
       */

        // tofix : exception.message会导致FF异常, 见 bug(10570602)
        //logger.error(exception.message, errorData);
      logger.warning(exception, errorData);
    };
  }
})();
