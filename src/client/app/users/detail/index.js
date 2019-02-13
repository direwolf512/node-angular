/**
 * @fileOverview
 * @author ISS
 */
(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UserDetail', UserDetail);

  UserDetail.$inject = ['$rootScope', '$routeParams', 'dataservice', 'Upload'];

  function UserDetail ($rootScope, $routeParams, dataservice, Upload) {
    var vm = this;
    vm.userId = $routeParams.id;
    vm.navs = [
      {
        name: '文章'
      }, {
        name: '粉丝'
      }
    ];
    vm.navNum = 0;
    vm.userMsg = {};
    vm.articles = [];
    vm.uploadPhoto = uploadPhoto;


    active();

    function active () {
      getUserMsg();
      getArticlesList();
    }

    /**
     * 获取用户信息
     * @return {void}
     */
    function getUserMsg () {
      dataservice.getUser(vm.userId).then(function (res) {
        vm.userMsg = res.data;
      }, function (err) {
        console.log(err);
      })
    }

    /**
     * 获取用户文章列表
     * @return {void}
     */
    function getArticlesList () {
      dataservice.getUserArticles(vm.userId).then(function (res) {
        vm.articles = res.data;
      }, function (err) {
        console.log(err);
      })
    }

    /**
     * 上传头像
     * @param {object} files - 文件
     * @param {object} errFiles - 错误信息
     * @return {void}
     */
    function uploadPhoto (file, errFiles) {
      if ($rootScope.id !== vm.userId) {
        return;
      }
      if ($rootScope.id === vm.userId) {
        vm.errFiles = errFiles;
        vm.errorMsg = '';
        // 多个文件上传
        if (file.length > 0) {
          var config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            url: 'http://localhost:3000/files/profile/photo',
            data: {attachment: file[0]}
          };
          dataservice.sss(config.data).then(function () {

          })
          /*file.upload = Upload.upload(config);
          file.upload.then(
            function (res) {
              console.log(res);
              vm.upLoadAvatar = res.data.path;
            },
            function (err) {
              if (err.status > 0) {
                vm.errorMsg = err.status + ': ' + err.msg;
              }
              vm.fullImg = false;
            },
            function (evt) {
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total, 10));
            }
          );*/
        }
      }
    }

  }
})();