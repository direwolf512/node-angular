(function () {
	'use strict';

	angular
		.module('app.article')
		.controller('ArticleDetail', ArticleDetail);

	ArticleDetail.$inject = ['$routeParams', 'dataservice'];

	function ArticleDetail ($routeParams, dataservice) {
		var vm = this;
		vm.articleId = $routeParams.id;
		
		active();
		
		function active () {
			getDetail();
			dataservice.readArticle(vm.articleId).then(function (res) {
				console.log(res);
			})
		}

		function getDetail () {
			dataservice.getArticle(vm.articleId).then(function (res) {
				var _data = res.data;
				vm.article = _data;
			});
		}

	}
})();