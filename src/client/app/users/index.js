/**
 * @fileOverview
 * @author ISS
 */

(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersAll', UsersAll);

  UsersAll.$inject = ['dataservice'];

  function UsersAll (dataservice) {
    var vm = this;

    active();

    function active () {
      dataservice.getUsers().then(function (res) {
        var _data = res.data;
        vm.users = _data;
        console.log(_data);
      });
    }
  }
})();