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
    vm.ifJoin = window.localStorage.getItem('userId') ? window.localStorage.getItem('userId') : null;

    active();

    function active () {
      getArticlesList();
    }

    function getArticlesList () {
      dataservice.getHotArticles().then(function (res) {
        var _data = res.data;
        vm.articles = _data;
      });
    }

  }
})();