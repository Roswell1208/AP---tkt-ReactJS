module.exports = app => {
    const race = require("../controllers/race.controller.js");

    var router = require("express").Router();

    // Create a new Race
    router.post("/", race.create);

    // Retrieve all Races
    router.get("/", race.findAll);

    // Retrieve a single Race with id
    router.get("/:id", race.findOne);

    // Update an race with id
    router.put("/:id", race.update);

    // Delete an race with id
    router.delete("/:id", race.delete);
        
    // Delete all races
    router.delete("/", race.deleteAll);

    app.use('/api/races', router);
};