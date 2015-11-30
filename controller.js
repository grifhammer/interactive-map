var stateMap = angular.module('interactiveMap', []);

stateMap.controller('interactiveMapCtrl', interactiveMapCtrl);

function interactiveMapCtrl($scope){
	$scope.states = states;

}

function getNewColor(){
	
}