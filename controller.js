var stateMap = angular.module('interactiveMap', []);

stateMap.controller('interactiveMapCtrl', interactiveMapCtrl);

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
		calculateWaysToWin();

	}

	calculateWaysToWin = function(){

		$scope.blueWins = waysTo270For('blue');
		$scope.redWins = waysTo270For('red');
	}

	waysTo270For = function(stateColor){
		//check current value of this colors states
		var currentVoteTotal = 0;
		if(stateColor == 'blue'){
			//use blue states
			currentVoteTotal = $scope.blueStateVotes;
		}else if(stateColor == 'red'){
			//use red states
			currentVoteTotal = $scope.redStateVotes;
		}else{
			//report error in requested state color
			return "state color must be 'red' or 'blue'";
		}
		if(currentVoteTotal >= 270){
			return ["You already won!"]
		}
		// find difference necessary to hit 270
		var necessaryVotes = Math.max(270 - currentVoteTotal,0);

		//get a non-empty array of all open states
		var currentOpenStates = [];
		for(var i = 0; i < 50; i++){
			if(openStates[i]){
				currentOpenStates.push(openStates[i]);
			}
		}

		// if maxvalue is less than result needed to get 270 return nothing
		// create 2d-array from 0-currentOpenStates.count(), and 0 to maxpossible value
		// take results from dynamic programming and only take results greater than min value to get over 270
		var avaliableVotes = 0;
		for(var arrayStart = 0; arrayStart < currentOpenStates.length; arrayStart++){
			avaliableVotes += currentOpenStates[arrayStart].electoralVotes;
		}

		//check if a win is possible
		if(avaliableVotes < necessaryVotes){
			return ['The election is won already'];
		}

		
		var possibleOpenStateCombinations = findStateCombinations(currentOpenStates, avaliableVotes);

		//split results to only those that would get us above 270 votes
		winningStateCombinations = possibleOpenStateCombinations.slice(necessaryVotes, possibleOpenStateCombinations.length);

		var maxResultsToDisplay = 10;
		var trimmedResults = trimResults(winningStateCombinations, maxResultsToDisplay);
		
		return trimmedResults;
		

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

