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
    vm.ifJoin = window.localStorage.getItem('userId') ? window.localStorage.getItem('userId') : null;
    vm.logOut = logOut;

    function logOut () {
      window.localStorage.setItem('userId', '');
      //document.cookie = "userId=" + null + ';path=/;';
      location.href = '/';
      console.log(11111111);
    }
  }
})();