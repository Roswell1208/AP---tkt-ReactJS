module.exports = app => {
    const race = require("../controllers/race.controller.js");

    var router = require("express").Router();

    // Retrieve all Races
    router.get("/", race.findAll);

    // Retrieve a single Race with id
    router.get("/:id", race.findOne);

    app.use('/api/races', router);
};