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
    vm.userArticles = userArticles;
    vm.choiceId  =null;
    vm.articles = [];
    vm.users = [];

    active();

    function active () {
      dataservice.getUsers().then(function (res) {
        var _data = res.data;
        vm.users = _data;
        vm.choiceId = _data[0].id;
        userArticles(_data[0].id);
      });
    }

    function userArticles (id) {
      vm.choiceId = id;
      dataservice.getUserArticles(id).then(function (res) {
        var _data = res.data;
        vm.articles = _data;
      })
    }
  }
})();