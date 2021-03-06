'use strict';

/**
 * @ngdoc function
 * @name artFinderApp.controller:SinglepostCtrl
 * @description
 * # SinglepostCtrl
 * Controller of the artFinderApp
 */
app.controller('SinglepostCtrl',['$scope', '$rootScope', '$routeParams', 'Post', 'UI', function ($scope, $rootScope, $routeParams, Post, UI) {
	
	//Récuperation des posts
	Post.find($routeParams.id).then(
		function (post){ // les posts sont récupérés !
			$scope.post =  post;
			UI.singlepost.playerArrowsShowHide($scope);
		},
		function (msg){ // erreur lors de la récupération des posts
			console.log(msg);
			$scope.post = false;
		}
	);

	//Initialisationde l'ui
 	UI.singlepost.init();

 	// PREV NEXT player 
	$scope.currentUrlId = 0;
 	$scope.img = angular.element(document.querySelector('section#player>img'));
 	$scope.arrows = [angular.element(document.querySelector('nav#prev')), angular.element(document.querySelector('nav#next'))];

	//Changer l'image avec prev
	document.getElementById('prev').addEventListener('click', function(){
		
		$scope.currentUrlId -= 1;
		$scope.img.attr('src', $scope.post.urls[$scope.currentUrlId]);
		UI.singlepost.playerArrowsShowHide($scope);
	});

 	//Changer l'image avec next
 	document.getElementById('next').addEventListener('click', function(){
 		
 		$scope.currentUrlId += 1;
 		$scope.img.attr('src', $scope.post.urls[$scope.currentUrlId]);
 		UI.singlepost.playerArrowsShowHide($scope);
 	});


 	$scope.newComment = {}

 	$scope.addComment = function(){

 		if(typeof $scope.newComment.username !== 'undefined' && typeof $scope.newComment.content !== 'undefined'){
 			
 			$scope.newComment.timestamp = new Date().getTime();

 			var d = new Date($scope.newComment.timestamp);
 			$scope.newComment.date = ('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)+'/'+d.getFullYear();

 			Post.saveComment($scope.post.id, $scope.newComment).then(
 				function(data){ //success
 					$scope.post.comments.push($scope.newComment);
					$scope.newComment = {};
 				},
 				function(msg){} //error
 			);	
 		}
 	};

 	$scope.likePost = function(){


 		Post.addLike($scope.post).then(
 			function(data){ //success
 				$scope.post.likes += 1;
 			},
 			function(msg){} //error
 		);
 	};
	
}]);
