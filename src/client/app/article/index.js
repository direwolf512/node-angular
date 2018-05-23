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
      dataservice.getArticles().then(function (res) {
        console.log(res);
      })
    }
  }
})();