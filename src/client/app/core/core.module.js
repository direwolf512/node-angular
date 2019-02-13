/**
 * @fileOverview
 * @author ISS
 */

(function () {
  'use strict';

  angular
    .module('app.core', [
      /* Angular modules */

      /* Cross-app modules */
      'blocks.logger', 'blocks.router', 'blocks.http', 'blocks.exception',

      /* 3rd-party modules */
      'ui.bootstrap', 'ngFileUpload'
    ])
})();