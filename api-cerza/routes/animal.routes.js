module.exports = app => {
    const animal = require("../controllers/animal.controller.js");

    var router = require("express").Router();

    // Create a new Animal
    router.post("/", animal.create);

    router.get("/race/:idRace", animal.findByRace);

    // Retrieve all Animals
    router.get("/", animal.findAll);

    // Retrieve a single Animal with id
    router.get("/:id", animal.findOne);

    // Update an animal with id
    router.put("/:id", animal.update);

    // Delete an animal with id
    router.delete("/:id", animal.delete);
    
    // Delete all animals
    router.delete("/", animal.deleteAll);

    app.use('/api/animals', router);
};