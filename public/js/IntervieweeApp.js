console.log("into the IntervieweeApp");

angular.module("IntervieweeApp", ["CustomFilter"])
	.controller("MainCtrl", function($scope, $http, $filter){
		$scope.username = username;
		$scope.usericon = usericon;
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

		$scope.getStatusColor = function(num){
			if(num == 0) return "progress-bar progress-bar-warning";
			else if(num == 1) return "progress-bar progress-bar-info";
			else if(num == 2) return "progress-bar progress-bar-success";
			else if(num == 3) return "progress-bar progress-bar-danger";
		}

/*		$scope.getPercent = function(num){
			console.log($scope.waitingPercent);
			if(num == 0) return $scope.waitingPercent;
			else if(num == 1) return "width: " + $scope.interviewingPercent + "%;"; 
			else if(num == 2) return "width: " + $scope.offeredPercent + "%;";
			else return "width: " + $scope.rejectedPercent + "%;";
		}*/

		$scope.addOne = function(){
			var addOneData = {};
			addOneData.username = $scope.username;
			addOneData.company = $scope.company;
			addOneData.position = $scope.position;
			addOneData.date = $scope.date;
			addOneData.status = 0;
			addOneData.key = $scope.username + $scope.company + $scope.position;

			$http.post('/addone', addOneData)
				.success(function(data){
					console.log("add one success");
					GetAll();
					GetNumbers();
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
				for(var i = 0; i < data.length; i++){
					if(data[i].status == 0)
						$scope.interviews[i].statusStr = "Waiting";
					if(data[i].status == 1)
						$scope.interviews[i].statusStr = "Interviewing";
					if(data[i].status == 2)
						$scope.interviews[i].statusStr = "Offered";
					if(data[i].status == 3)
						$scope.interviews[i].statusStr = "Rejected";
				}
			});
		}

		function GetNumbers(){
			$http.get('/getnumsall').success(function(data){
				$scope.all = data.all;
			});
			$http.get('/getnumswaiting').success(function(data){
				$scope.waiting = data.waiting;
				$scope.waitingPercent = $scope.waiting / $scope.all * 100;
			});
			$http.get('/getnumsinterviewing').success(function(data){
				$scope.interviewing = data.interviewing;
				$scope.interviewingPercent = $scope.interviewing / $scope.all * 100;
			});
			$http.get('/getnumsoffered').success(function(data){
				$scope.offered = data.offered;
				$scope.offeredPercent = $scope.offered / $scope.all * 100;
			});
			$http.get('/getnumsrejected').success(function(data){
				$scope.rejected = data.rejected;
				$scope.rejectedPercent = $scope.rejected / $scope.all * 100;
			});
		}
	});
