var stateMap = angular.module('interactiveMap', []);

stateMap.controller('interactiveMapCtrl', interactiveMapCtrl);

stateMap.directive('clickState', function(){
	return{
		link: function($scope, element){
			element.bind('click',function(){
				var newColor = getNewColor($scope.state);
				var stateElement = element[0].querySelector('path');
				console.log(element[0])
				stateElement.setAttribute('class', 'state ' + newColor);
			});
		}
	}
});


function interactiveMapCtrl($scope){
	$scope.states = states;

}

function getNewColor(state){
	if(state.stateColor === "red"){
		state.stateColor = "blue"
		return "blue";
	} else if(state.stateColor === "blue"){
		state.stateColor = "open"
		return "open";
	} else if(state.stateColor === "open"){
		state.stateColor = "red"
		return "red"
	} else{
		alert("You fucked up!")
		return "communist";
	}
}

