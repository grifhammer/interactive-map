var stateMap = angular.module('interactiveMap', []);

stateMap.controller('interactiveMapCtrl', interactiveMapCtrl);

stateMap.directive('clickState', function(){
	return{
		link: function($scope, element){
			element.bind('click',function(){});
		}
	}
});


function interactiveMapCtrl($scope){

	calculateStateTotals = function(){
		$scope.redStateVotes = 0;
		$scope.blueStateVotes = 0;
		$scope.openStateVotes = 0;
		for(var i = 0; i < numStates; i++){
			if(blueStates[i]){
				$scope.blueStateVotes += blueStates[i].electoralVotes;
			} else if(redStates[i]){
				$scope.redStateVotes += redStates[i].electoralVotes;
			} else if(openStates[i]){
				$scope.openStateVotes += openStates[i].electoralVotes;
			}
		}
		$scope.blueWidth = ($scope.blueStateVotes/ 538)*100 + '%';
		$scope.redWidth = ($scope.redStateVotes/ 538)*100 + '%';
		$scope.openWidth = ($scope.openStateVotes/ 538)*100 + '%';

	}

	$scope.stateClicked = function(state){
		var newColor = getNewColor(state);
		calculateStateTotals();
	}

	$scope.reset = function(){
		resetStates();
		$scope.states = states;
		calculateStateTotals();
	}

	resetStates();
	$scope.states = states;

	calculateStateTotals();

	

}


	




function getNewColor(state){
	if(state.stateColor === "red"){
		state.stateColor = "blue"
		redStates[state.id] = null;
		blueStates[state.id] = state;
		return "blue";
	} else if(state.stateColor === "blue"){
		state.stateColor = "open"
		blueStates[state.id]= null;
		openStates[state.id] = state;
		return "open";
	} else if(state.stateColor === "open"){
		state.stateColor = "red"
		openStates[state.id] = null;
		redStates[state.id] = state;
		return "red"
	} else{
		alert("You fucked up!")
		return "communist";
	}
}

