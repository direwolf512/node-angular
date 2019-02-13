/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular.module('app.widgets')
    .controller('confirmDialog', confirmDialog);

  confirmDialog.$inject = ['$uibModalInstance', 'data'];

  function confirmDialog ($uibModalInstance, data) {
    var $ctrl = this;
    $ctrl.config = data;
    $ctrl.closeModal = closeModal;
    $ctrl.makeSure = makeSure;
    active();

    ///////////////////

    function active () {

    }

    function makeSure () {
      window.localStorage.setItem('userId', '');
      //document.cookie = "userId=" + null + ';path=/;';
      location.href = '/';
    }

    function closeModal () {
      $uibModalInstance.close();
    }
  }
})();