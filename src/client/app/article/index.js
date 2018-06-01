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

    active();

    function active () {
      getArticlesList();
    }

    function getArticlesList () {
      dataservice.getArticles().then(function (res) {
        var _data = res.data;
        vm.articles = _data;
      });
    }
  }
})();