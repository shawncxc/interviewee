console.log("into the customfilter");

angular.module("CustomFilter", [])
	.filter("Search", function(){
		return function(interviews, target){
			console.log(interviews);
			var result = [];
			for(var i = 0; i < interviews.length; i++){
				if(interviews[i].company == target || 
					interviews[i].position == target || 
					interviews[i].date == target ||
					target == null ||
					target == ""){
					result.push(interviews[i]);
				}
			}
			return result;
		};
	});