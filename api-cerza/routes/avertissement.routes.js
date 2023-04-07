module.exports = app => {
    const avertissements = require("../controllers/avertissement.controller.js");

    var router = require("express").Router();

    // Create a new Avertissement
    router.post("/", avertissements.create);

    // Retrieve all avertissement
    router.get("/", avertissements.findAll);

    // Retrieve a single avertissement with id
    router.get("/:id", avertissements.findOne);

    // Update a avertissement with id
    router.put("/:id", avertissements.update);

    // Delete a avertissement with id
    router.delete("/:id", avertissements.delete);

    // Delete all avertissements
    router.delete("/", avertissements.deleteAll);

    app.use('/api/avertissements', router);
};