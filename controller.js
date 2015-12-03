var stateMap = angular.module('interactiveMap', []);

stateMap.controller('interactiveMapCtrl', interactiveMapCtrl);

stateMap.directive('clickState', function(){
	return{
		link: function($scope, element){
			element.bind('click',function(){
				var newColor = getNewColor($scope.state);
				var stateElement = element[0].querySelector('path');
				stateElement.setAttribute('class', 'state ' + newColor);
				$scope.$parent.calculateStateTotals();
			});
		}
	}
});


function interactiveMapCtrl($scope){

	$scope.calculateStateTotals = function(){
		$scope.redStateVotes = 0;
		$scope.blueStateVotes = 0;
		$scope.openStateVotes = 0;
		for(var i = 0; i < numStates; i++){
			if(blueStates[i]){
				$scope.redStateVotes += blueStates[i].electoralVotes;
			} else if(redStates[i]){
				$scope.blueStateVotes += redStates[i].electoralVotes;
			} else if(openStates[i]){
				$scope.openStateVotes += openStates[i].electoralVotes;
			}
			
		}
	}


	$scope.states = states;

	$scope.calculateStateTotals();

	

}





function getNewColor(state){
	if(state.stateColor === "red"){
		state.stateColor = "blue"
		redStates.splice(state.id,1, '');
		blueStates[state.id] = state;
		return "blue";
	} else if(state.stateColor === "blue"){
		state.stateColor = "open"
		blueStates.splice(state.id,1, '');
		openStates[state.id] = state;
		return "open";
	} else if(state.stateColor === "open"){
		state.stateColor = "red"
		openStates.splice(state.id,1,'');
		redStates[state.id] = state;
		return "red"
	} else{
		alert("You fucked up!")
		return "communist";
	}
}

