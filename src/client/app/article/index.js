/**
 * @fileOverview
 * @author ISS
 */

(function () {
  'use strict';

  angular
    .module('app.article')
    .controller('Article', Article);

  Article.$inject = ['dataservice'];

  function Article (dataservice) {
    var vm = this;
    vm.ifJoin = false;

    active();

    function active () {
      dataservice.getArticles().then(function (res) {
        var _data = res.data;
        vm.articles = _data;
        console.log(res);
      });
      var data = {
        username: 'user1',
        password: '123456'
      };
      /*dataservice.login(data).then(function (res) {
        console.log(res);
      })*/
    }
  }
})();