/**
 * @fileOverview
 * @author ISS
 */

(function () {
  'use strict';

  angular
    .module('app.article')
    .controller('Article', Article);

  Article.$inject = [];

  function Article () {
    var vm = this;

    active();

    function active () {

    }
  }
})();