// Reference code [https://github.com/the-Coding-Boot-Camp-at-UT/UTAUS201807FSF2-FT/tree/master/class-content/13-express/01-Activities/16-HotRestaurant/Solved]
// ==============================================================================
// DEPENDENCIES
// ==============================================================================

const express = require("express");
const bodyParser = require("body-parser");

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ================================================================================
// ROUTER
// ================================================================================

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
