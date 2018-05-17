/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.article')
    .controller('ArticleAll', ArticleAll);

  ArticleAll.$inject = [];

  function ArticleAll () {
    var vm = this;

    active();

    function active () {

    }
  }
})();