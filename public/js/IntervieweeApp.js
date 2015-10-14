console.log("into the IntervieweeApp");

angular.module("IntervieweeApp", ["CustomFilter"])
/*	.filter("Search", function(){
		return function(interviews, target){
			console.log(target);
			var result = [];
			for(var i = 0; i < target.length; i++){
				if(interviews.company == target || 
					interviews.position == target || 
					interviews.date == target ||
					target == null){
					result.push(interviews[i]);
				}
			}
			return result;
		};
	})*/
	.controller("MainCtrl", function($scope, $http, $filter){
		$scope.username = username;
		GetAll();
		GetNumbers();

		var selectedCategory = -1;
		$scope.selectCategory = function(num){
			selectedCategory = num;
		};
		$scope.categoryFilter = function(interview){
			return selectedCategory == -1 || interview.status == selectedCategory;
		};
		$scope.getCategoryClass = function(num){
			return selectedCategory == num ? "active" : "";
		};

		$scope.addOne = function(){
			var addOneData = {};
			addOneData.username = $scope.username;
			addOneData.company = $scope.company;
			addOneData.position = $scope.position;
			addOneData.date = $scope.date;
			addOneData.status = 0;
			addOneData.key = $scope.username + $scope.company + $scope.position;

			//console.log(addOneData);
			$http.post('/addone', addOneData)
				.success(function(data){
					console.log("add one success");
					GetAll();
					GetNumbers();
					$scope.username = "";
					$scope.company = "";
					$scope.position = "";
					$scope.date = "";
				})
				.error(function(data){
					console.log("add one fail");
				});
		};

		$scope.Delete = function(key){
			$http.post('/deleteone', {key: key})
				.success(function(){
					console.log("delete success");
					GetAll();
					GetNumbers();
				})
				.error(function(){
					console.log("delete fail");
				});
		};

		$scope.Interviewing = function(key){
			$http.post('/interviewingone', {key: key})
				.success(function(){
					console.log("interviewing one success");
					GetAll();
					GetNumbers();
				})
				.error(function(){
					console.log("interviewing one fail");
				});
		};

		$scope.Offered = function(key){
			$http.post('/offeredone', {key: key})
				.success(function(){
					console.log("Offered one success");
					GetAll();
					GetNumbers();
				})
				.error(function(){
					console.log("Offered one fail");
				});
		};

		$scope.Rejected = function(key){
			$http.post('/rejectedone', {key: key})
				.success(function(){
					console.log("Rejected one success");
					GetAll();
					GetNumbers();
				})
				.error(function(){
					console.log("Rejected one fail");
				});
		};

		$scope.showAll = function(){
			selectedCategory = null;
			GetAll();
		};

		function GetAll(){
			$http.get('/getall').success(function(data){
				$scope.interviews = data;
				//console.log($scope.interviews);
			});
		}

		function GetNumbers(){
			$http.get('/getnumsall').success(function(data){
				$scope.all = data.all;
			});
			$http.get('/getnumswaiting').success(function(data){
				$scope.waiting = data.waiting;
			});
			$http.get('/getnumsinterviewing').success(function(data){
				$scope.interviewing = data.interviewing;
			});
			$http.get('/getnumsoffered').success(function(data){
				$scope.offered = data.offered;
			});
			$http.get('/getnumsrejected').success(function(data){
				$scope.rejected = data.rejected;
			});
		}
	});
