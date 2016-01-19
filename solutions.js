+function ($){

    findStateCombinations = function(openStates){
        var avaliableVotes = 0;
        for(var arrayStart = 0; arrayStart < openStates.length; arrayStart++){
            avaliableVotes += openStates[arrayStart].electoralVotes;
        }

        var prevCombinationsArray = [];

        var currentOpenStates = openStates;

        // Initialize combinations nested array
        for(var currVoteTotal = 0; currVoteTotal <= avaliableVotes; currVoteTotal++){
            prevCombinationsArray[currVoteTotal] = [];
        }


        // loop through all avaliable states
        for(var currStateIndex = 0; currStateIndex < currentOpenStates.length; currStateIndex++){
            // loop through all possible vote combinations

            var currState = currentOpenStates[currStateIndex];
            var newCombinationsArray = prevCombinationsArray.map(function(arr){
                return arr.slice();
            });

            for(var currVoteTotal = 0; currVoteTotal <= avaliableVotes; currVoteTotal++){
                // loop through all combinations totaling in currVoteTotal

                var currCombinations = prevCombinationsArray[currVoteTotal];
                for(var combinationIndex = 0; combinationIndex < currCombinations.length; combinationIndex++){

                    var newCombination = currCombinations[combinationIndex].slice();
                    newCombination.push(currState.name) 

                    newCombinationsArray[currVoteTotal + currState.electoralVotes].push(newCombination);
                }
                if(currVoteTotal === currState.electoralVotes){
                    newCombinationsArray[currVoteTotal].push([currState.name]);
                }
            }
            prevCombinationsArray = newCombinationsArray.slice()
        }
        return prevCombinationsArray;
    }


    trimResults = function(stateCombinations, maxResultsToReturn){
        var resultsToReturn = [];
        var numResultsInArray = 0;
        var resultsIndex = 0;

        //Trim down number of results so that ng-repeat doesnt slow down the site as much
        while(numResultsInArray < maxResultsToReturn && resultsIndex < stateCombinations.length){
            //check that there are results for this value
            if(stateCombinations[resultsIndex]){
                //if so put results into the results array until we hit the max
                stateCombinations[resultsIndex].map(function(winningCombination){

                    if(numResultsInArray < maxResultsToReturn){
                        resultsToReturn.push(winningCombination);
                        numResultsInArray++;
                    }
                });
            }
            resultsIndex++;
        }


        return resultsToReturn;
    }

}()