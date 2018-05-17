/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell', Shell);

  Shell.$inject = [];
  function Shell () {
    var vm = this;
    vm.title = '1111111111';
  }
})();