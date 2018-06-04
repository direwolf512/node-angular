/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.article')
    .controller('ArticleAdd', ArticleAdd);

  ArticleAdd.$inject = ['dataservice'];

  function ArticleAdd (dataservice) {
    var vm = this;
    vm.add = add;
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

    }

    function add () {
      dataservice.addArticle(vm.article).then(function (data) {
        console.log(data);
        window.location.href = '/article/all';
      })
    }
  }
})();