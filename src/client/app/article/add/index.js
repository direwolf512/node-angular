/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.article')
    .controller('ArticleAdd', ArticleAdd);

  ArticleAdd.$inject = ['$routeParams', 'dataservice'];

  function ArticleAdd ($routeParams, dataservice) {
    var vm = this;
    vm.add = add;
    vm.articleId = $routeParams.id ? $routeParams.id : null;
    vm.authorId = window.localStorage.getItem('userId');
    vm.article = {
      title: '',
      link: '',
      summary: '',
      img: '',
      authorId : vm.authorId
    };

    active();

    function active () {
      if (vm.articleId) {
        getArticle();
      }
    }

    function getArticle () {
      dataservice.getArticle(vm.articleId).then(function (data) {
        var _data = data.data;
        vm.article = {
          title: _data.title,
          link: _data.link,
          summary: _data.summary,
          img: _data.img,
          createdAt: _data.createdAt,
          readQuantity: _data.readQuantity
        };
      })
    }

    function add (id) {
      var params = {
        id: id,
        data: vm.article
      };
      dataservice.addArticle(params).then(function (data) {
        window.location.href = '/article/all';
      })
    }
  }
})();