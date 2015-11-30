var stateMap = angular.module('interactiveMap', []);

stateMap.controller('interactiveMapCtrl', interactiveMapCtrl);

stateMap.directive('clickState', function(){
	return{
		link: function($scope, element){
			element.bind('click',function(){
				var newColor = "red";
				var stateElement = element[0].querySelector('path');
				console.log(stateElement);
				stateElement.setAttribute('class', 'state ' + newColor);
			});
		}
	}
});


function interactiveMapCtrl($scope){
	$scope.states = states;

}

function getNewColor(){

}

