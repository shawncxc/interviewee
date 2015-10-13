console.log("into the IntervieweeApp");

angular.module("IntervieweeApp", []);
	/*.constant("signupUrl", "/signup")
	.controller("signupCtrl", function($scope, $http, $location, signupUrl){
		$scope.signup = function(){
			var signupData = {};
			signupData.username = $scope.username;
			signupData.password = $scope.password;
			console.log(signupData);
			$http.post(signupUrl, signupData)
				.success(function(data){
					console.log("sign in success");
				})
				.error(function(data){
					console.log("sign in fail");
				});
		};
	});*/