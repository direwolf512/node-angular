/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UserDetail', UserDetail);

  UserDetail.$inject = ['$rootScope', 'dataservice'];

  function UserDetail ($rootScope, dataservice) {
    var vm = this;
    vm.navs = [
      {
        name: '文章'
      }, {
        name: '粉丝'
      }
    ];
    vm.navNum = 0;
    vm.articles = [];

    active();

    function active () {
      getArticlesList();
    }

    function getArticlesList () {
      dataservice.getUserArticles($rootScope.id).then(function (res) {
        var _data = res.data;
        vm.articles = _data;
      })
    }
  }
})();