/**
 * @fileOverview
 * @author ISS
 */

(function () {
  'use strict';

  angular
    .module('app.core')
    .filter('decodeStr', decodeStr)
    .filter('stringToArray', stringToArray)
    .filter('trustAsHtml', trustAsHtml)
    .filter('suggestionTransition', suggestionTransition)
    .filter('limitLength', limitLength)
    .filter('cutLength', cutLength);

  /* 限制搜索结果条数 */
  function limitLength () {
    return limitLengthFilter;
    function limitLengthFilter (input) {
      var data = '';
      if (input && input.length > 5) {
        data = input.slice(0, 5);
      } else {
        data = input;
      }
      return data;
    }
  }

  /* 截取字符串 */
  function cutLength () {
    return cutLengthFilter;
    function cutLengthFilter (input, length) {
      var data = '';
      if (input && input.length > length) {
        data = input.slice(0, length) + '...';
      } else {
        data = input;
      }
      return data;
    }
  }

  /**
   * decodeUrl
   * @returns {string} result - decodeUrl后的结果
   */
  function decodeStr () {
    return decodeStrFilter;
    //////////////////////////////////////////////////
    function decodeStrFilter (parameters) {
      return decodeURI(parameters);
    }
  }

  /**
   * 字符串转数组
   * @returns {Object} stringToArrayFilter - stringToArrayFilter
   */
  function stringToArray () {
    return stringToArrayFilter;
    //////////////////////////////////////////////////
    function stringToArrayFilter (parameters) {
      return parameters.split(',');
    }
  }

  /**
   * $sce trustAsHtml
   * @returns {string} html code
   */
  trustAsHtml.$inject = ['$sce'];
  function trustAsHtml ($sce) {
    return trustAsHtmlFilter;
    //////////////////////////////////////////////////
    function trustAsHtmlFilter (parameters) {
      return $sce.trustAsHtml(parameters);
    }
  }


  /**
   * 建议的状态转换
   * @returns {Object} suggestionTransitionFilter - suggestionTransitionFilter
   */
  function suggestionTransition () {
    return suggestionTransitionFilter;
    //////////////////////////////////////////////////
    function suggestionTransitionFilter (parameters) {
      var status = {
        '': '全部',
        '0': '已提交',
        '1': '预审通过',
        '2': '预审未通过',
        '3': '已采纳',
        '4': '未采纳',
        '6': '暂不修复',
        '7': '延期修复',
        '8': '已实现',
        '9': '已删除'
      };
      var result = status[parameters];
      return result;
    }
  }
})();

