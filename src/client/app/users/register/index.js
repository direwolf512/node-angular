/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersRegister', UsersRegister);

  UsersRegister.$inject = ['dataservice'];

  function UsersRegister (dataservice) {
    var vm = this;
    vm.registerMsg = {};
    vm.signIn = signIn;
    vm.judgeName = judgeName;
    vm.ifUsername = false;

    active();

    function active () {

    }

    function judgeName () {
      dataservice.judgeUserName(vm.registerMsg).then(function (res) {
        var _data = res.data;
        if (_data) {
          vm.ifUsername = true;
        } else {
          vm.ifUsername = false;
        }
      })
    }

    function signIn() {
      dataservice.register(vm.registerMsg).then(function (res) {
        var _data = res.data;
        if (_data) {
          alert('恭喜注册成功');
        } else {
          alert('对不起，注册失败，请稍后再试');
        }
      })
    }

  }
})();