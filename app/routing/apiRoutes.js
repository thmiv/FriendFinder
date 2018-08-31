// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const peopleData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(peopleData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
      peopleData.push(req.body);
      console.log(peopleData[peopleData.length - 1])
  });
}

// ===============================================================================
// Functionality
// ===============================================================================

function getMatch(userData) {
  var scoreDifferences = [];
  var userScores =  req.body.scores;
  console.log('\n' + userScores + '\n');

  peopleData.forEach(function(person, pIndex) {
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
