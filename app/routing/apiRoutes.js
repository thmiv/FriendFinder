// ===============================================================================
// LOAD DATA
// ===============================================================================

const peopleData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(peopleData);
  });

  app.post("/api/friends", function(req, res) {
    var yourMatch = getMatch(req.body);
    peopleData.push(req.body);
    //console.log(yourMatch);
    res.json(yourMatch);
  });
}

// ===============================================================================
// Functionality
// ===============================================================================

function getMatch(userData) {
  var scoreDifferences = [];
  var userScores = userData.scores;

  peopleData.forEach(function (person, pIndex) {
      var personDifference = 0;
      var personScores = person.scores;

      for (i = 0; i < personScores.length; i++) {
          var questionDifference = parseInt(personScores[i]) - parseInt(userScores[i]);

          personDifference += Math.abs(questionDifference);
      }

      var personObject = {
          id: pIndex,
          score: personDifference
      }

      scoreDifferences.push(personObject);
  });
  var sortedScores = bubbleSort(scoreDifferences);
  return peopleData[sortedScores[0].id];
}

function bubbleSort(scoreArray) {
  var sorted = false;

  while (!sorted) {
      sorted = true;
      for (var i = 0; i < scoreArray.length - 1; i++) {
          if (scoreArray[i].score > scoreArray[i + 1].score) {
              sorted = false;
              var temp = scoreArray[i];
              scoreArray[i] = scoreArray[i + 1];
              scoreArray[i + 1] = temp;
          }
      }
  }

  return scoreArray;
}
