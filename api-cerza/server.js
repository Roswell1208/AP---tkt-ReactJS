const express = require("express");
const cors = require("cors");

const app = express();



var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/user.routes.js")(app);
require("./routes/missions.routes.js")(app);
require("./routes/enclos.routes.js")(app);
require("./routes/animal.routes.js")(app);
require("./routes/race.routes.js")(app);
require("./routes/avertissement.routes.js")(app);
require("./routes/niveauAlerte.routes.js")(app);
require("./routes/etatSante.routes.js")(app);
require("./routes/roles.routes.js")(app);

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// Tuto : https://www.bezkoder.com/node-js-rest-api-express-mysql/