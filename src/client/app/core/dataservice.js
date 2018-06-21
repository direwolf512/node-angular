/**
 * @fileOverview
 * @author ISS
 */

(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', 'exception', 'logger'];

  /* @ngInject */
  function dataservice ($http, $q, exception, logger) {
    var isPrimed = false;
    var primePromise;

    var service = {
      /*
       * Account
       */
      getSuggestionAward: getSuggestionAward,
      addSuggestion: addSuggestion,
      deleteSuggestion: deleteSuggestion,
      setAttention: setAttention,
      getArticles: getArticles,
      getUserArticles: getUserArticles,
      getHotArticles: getHotArticles,
      getUsers: getUsers,
      getUser: getUser,
      login: login,
      register: register,
      judgeUserName: judgeUserName,
      getArticle: getArticle,
      addArticle: addArticle,
      readArticle: readArticle,
      // 公共方法
      ready: ready

    };

    return service;

    //////////////////////////////////////////////////

    /*
     * 注册
     * @param data 账号密码
     * @returns {Object}
     */
    function register (data) {
      var _config = {
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: data
      };
      return _commonAjax(_config);
    }

    /*
     * 用户名防重
     * @param data 账号
     * @returns {Object}
     */
    function judgeUserName (data) {
      var _config = {
        method: 'POST',
        url: 'http://localhost:3000/usernames',
        data: data
      };
      return _commonAjax(_config);
    }

    /*
     * 登录
     * @param data 账号密码
     * @returns {Object}
     */
    function login (data) {
      var _config = {
        method: 'POST',
        url: 'http://localhost:3000/login',
        data: data
      };
      return _commonAjax(_config);
    }

    /**
     * 获取热门文章列表
     * @returns {Object}
     */
    function getHotArticles () {
      var _config = {
        url: 'http://localhost:3000/articles/hot'
      };

      return _commonAjax(_config);
    }

    /**
     * 获取文章列表
     * @returns {Object}
     */
    function getArticles () {
      var _config = {
        url: 'http://localhost:3000/articles'
      };

      return _commonAjax(_config);
    }

    /**
     * 获取用户文章列表
     * @returns {Object}
     */
    function getUserArticles (id) {
      var _config = {
        url: 'http://localhost:3000/articles/user/' + id
      };

      return _commonAjax(_config);
    }

    /**
     * 添加文章
     * @returns {Object}
     */
    function addArticle (data) {
      var url = (!!data.id) ? ('http://localhost:3000/articles/' + data.id) : ('http://localhost:3000/articles');
      var _config = {
        method: 'POST',
        url: url,
        data: data.data
      };

      return _commonAjax(_config);
    }

    /**
     * 增加文章阅读量
     * @returns {Object}
     */
    function readArticle (id) {
      var _config = {
        method: 'POST',
        url: 'http://localhost:3000/articles/readQuantity',
        data: {
          id: id
        }
      };

      return _commonAjax(_config);
    }

    /**
     * 获取用戶列表
     * @returns {Object}
     */
    function getUsers () {
      var _config = {
        url: 'http://localhost:3000/users'
      };

      return _commonAjax(_config);
    }

    /**
     * 获取用戶信息
     * @returns {Object}
     */
    function getUser (id) {
      var _config = {
        url: 'http://localhost:3000/users/' + id
      };

      return _commonAjax(_config);
    }

    /**
     * 获取文章详情
     * @returns {Object}
     */
    function getArticle (id) {
      var _config = {
        url: 'http://localhost:3000/articles/' + id
      };
      return _commonAjax(_config);
    }

    /*
     *关注
     * @param id 被关注人id
     * @returns {Object}
     */
    function setAttention (id) {
      var _config = {
        method: 'POST',
        url: '/user/user/' + id + '/follow'
      };

      return _commonAjax(_config);
    }


    /**
     * 最新打赏
     * @param {Object} params - 打赏条数
     * @returns {Object} getSuggestionTop promise
     */
    function getSuggestionAward (params) {
      var _config = {
        url: '/user/suggestion/awarded',
        params: params || {
          limit: 10
        }
      };

      return _commonAjax(_config);
    }

    /**
     * 新增或修改 建议
     * @param {Object} config - 配置对象
     * @param {string} config.id - 建议id (如果存在, 说明是修改操作)
     * @param {Object} config.data - form 数据
     * @returns {Object} - Promise
     */
    function addSuggestion (config) {
      var url = (!!config.id) ? ('/user/suggestion/' + config.id) : ('/user/suggestion');
      var _config = {
        headers: config.headers,
        method: 'POST',
        url: url,
        data: config.data
      };

      return _commonAjax(_config);
    }

    /**
     * 删除建议
     * @param {Object} config - 参数对象
     * @param {number} config.id - 建议id
     * @returns {Object} - Promise
     */
    function deleteSuggestion (config) {
      var _config = {
        method: 'DELETE',
        url: '/user/suggestion/' + config.id
      };
      return _commonAjax(_config);
    }


    //////////////////////////////////////////////////

    /**
     * @func _commonAjax
     * @desc 通用方法
     * @param {Object} config - $http config
     * @returns {Object} $http promise
     */
    function _commonAjax (config) {
      var defer = $q.defer();
      var _config = {
        //headers: config.headers,
        method: config.method || 'GET',
        url: config.url || '/',
        params: config.params || {},
        data: config.data || {}
      };
      var errInfo = 'XHR Failed for api ' + config.url;
      // 解决IE缓存问题 : get请求的随机token参数
      if (_config.method === 'GET') {
        _config.url = _config.url + '?token=' + Math.random();
      }

      $http(_config)
        .then(commonAjaxComplete, commonAjaxError)
        .catch(function (message) {
          exception.catcher(errInfo)(message);
        });

      return defer.promise;

      //////////////////////////////////////////////////

      function commonAjaxComplete (data) {
        defer.resolve(data);
      }

      function commonAjaxError (err) {
        defer.reject(err);
      }
    }

    function _prime () {
      // This function can only be called once.
      if (isPrimed) {
        return primePromise;
      }
      primePromise = $q.when(true).then(success);
      return primePromise;

      function success () {
        isPrimed = true;
        logger.info('Primed data');
      }
    }

    function ready (nextPromises) {
      var readyPromise = primePromise || _prime();

      return readyPromise
        .then(function () {
          return $q.all(nextPromises);
        })
        .catch(exception.catcher(' ready function failed '));
    }
  }
})();

