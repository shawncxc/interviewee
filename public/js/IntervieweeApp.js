console.log("into the IntervieweeApp");

angular.module("IntervieweeApp", [])
	.constant("addOneUrl", "/addone")
	.controller("MainCtrl", function($scope, $http, addOneUrl){
		$scope.username = username;
		GetAll();

		$scope.addOne = function(){
			var addOneData = {};
			addOneData.username = $scope.username;
			addOneData.company = $scope.company;
			addOneData.position = $scope.position;
			addOneData.date = $scope.date;
			addOneData.status = 0;
			addOneData.key = $scope.username + $scope.company + $scope.position;

			//console.log(addOneData);
			$http.post(addOneUrl, addOneData)
				.success(function(data){
					console.log("add one success");
					GetAll();
				})
				.error(function(data){
					console.log("add one fail");
				});
		};

		function GetAll(){
			$http.get('/getall').success(function(data){
				$scope.interviews = data;
				console.log($scope.interviews);
			});
		}
	});
