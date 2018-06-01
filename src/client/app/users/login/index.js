/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersLogin', UsersLogin);

  UsersLogin.$inject = ['dataservice'];

  function UsersLogin (dataservice) {
    var vm = this;
    vm.userLogin = userLogin;

    active();

    function active () {

    }

    function userLogin() {
      dataservice.login(vm.loginMsg).then(function (res) {
        var _data = res.data;
        alert(_data);
      });
    }
  }
})();