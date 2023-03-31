module.exports = app => {
    const missions = require("../controllers/missions.controller.js");

    var router = require("express").Router();

    // Create a new Mission
    router.post("/", missions.create);

    // Retrieve all Missions
    router.get("/", missions.findAll);

    // Retrieve a single Mission with username
    router.get("/:id", missions.findOne);

    // Update a Mission state with id
    router.put("/updateState/:id/:state", missions.updateState);

    // Update a Mission commentary with id
    router.put("/updateComments/:id/:comment", missions.updateCommentary);

    // Delete a User with id
    /*router.delete("/:id", users.delete);

    // Delete all Users
    router.delete("/", users.deleteAll);*/

    app.use('/api/missions', router);
};