(function () {
	'use strict';

	angular
		.module('app.article')
		.controller('ArticleDetail', ArticleDetail);

	ArticleDetail.$inject = ['$location'];

	function ArticleDetail ($location) {
		var vm = this;
		vm.sss = $location.path().split('/');
		vm.articleId = vm.sss[2];
		
		active();
		
		function active () {
			
		}
	}
})();