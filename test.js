// js file for testing data and functions

const peopleData = require("./app/data/friends");

var userData = peopleData[peopleData.length - 1];

function getMatch(userData) {
    var scoreDifferences = [];
    var userScores =  ["3", "3", "3", "3", "3", "3", "3", "3", "3", "3" ];
    console.log("User: " + userScores + '\n');

    peopleData.forEach(function(person, pIndex) {
        var personDifference = 0;
        var personScores = person.scores;
        console.log(person.name +": "+ personScores);
        for (i = 0; i < personScores.length; i++) {
            var questionDifference = parseInt(personScores[i]) - parseInt(userScores[i]);
            console.log("Q"+i+" "+ questionDifference);
            personDifference += Math.abs(questionDifference); 
        }
        var personObject = {
          id: pIndex,
          score: personDifference
        }
        scoreDifferences.push(personObject);
        console.log("Difference of "+ person.name +": "+ personDifference + "\n");
    });
    console.log(scoreDifferences);
    // console.log("Score Differences Array: " + scoreDifferences);
    var sortedScores = bubbleSort(scoreDifferences);
    console.log(sortedScores);
    console.log("\nbest match is " + peopleData[sortedScores[0].id].name);
    console.log(" ");
}

function bubbleSort(scoreArray) {
    // sorted acts as a flag to let us know if our array has been completely sorted
    var sorted = false;

    while (!sorted) {
      sorted = true;
      // Loop through the array
      for (var i = 0; i < scoreArray.length - 1; i++) {
        // If the current element is larger than the next element, swap them and set sorted to `false`
        if (scoreArray[i].score > scoreArray[i + 1].score) {
          sorted = false;
          var temp = scoreArray[i];
          scoreArray[i] = scoreArray[i + 1];
          scoreArray[i + 1] = temp;
        }
      }
    }

    // If we looped through the array without having to swap anything, exit the while loop and return the array
    return scoreArray;

    // scoreArray.forEach(function(item) {
    //   console.log("item score: " + item.score);
    // })
  }

  getMatch(userData);
