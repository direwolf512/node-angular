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
    vm.ifJoin = false;
    vm.articles = [
      {
        title: 'article titlearticle titlearticle titlearticle titlearticle titlearticle titlearticle titlearticle titlearticle title',
        img: 'app/content/banner.jpg',
        link: '/article/1',
        summary: '这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍，这是一段介绍。',
				author: {
          name: 'direwolf',
          link: 'https://www.google.com'
        },
        updatedAt: '1232424144243'
      }, {
				title: 'article title',
				img: 'app/content/banner.jpg',
				link: '/article/2',
				summary: 'summarysummarysummarysummarysummarysummary',
				author: {
					name: 'direwolf',
					link: 'https://www.google.com'
				},
				updatedAt: '1232424144243'
			}, {
				title: 'article title',
				img: 'app/content/banner.jpg',
				link: '/article/3',
				summary: 'summarysummarysummarysummarysummarysummary',
				author: {
					name: 'direwolf',
					link: 'https://www.google.com'
				},
				updatedAt: '1232424144243'
			}
    ];

    active();

    function active () {
      dataservice.getArticles().then(function (res) {
        console.log(res);
      })
      var data = {
        username: 'user1',
        password: '123456'
      }
      dataservice.login(data).then(function (res) {
        console.log(res);
      })
    }
  }
})();