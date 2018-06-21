/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.article')
    .controller('ArticleAll', ArticleAll);

  ArticleAll.$inject = ['dataservice'];

  function ArticleAll (dataservice) {
    var vm = this;
    vm.articles = [];

    active();

    function active () {
      getArticles();
    }

    function getArticles () {
      dataservice.getArticles().then(function (data) {
        var _data = data.data;
        vm.articles = _data;
      })
    }
  }
})();