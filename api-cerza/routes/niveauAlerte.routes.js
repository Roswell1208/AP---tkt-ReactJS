module.exports = app => {
    const niveauAlerte = require("../controllers/niveauAlerte.controller.js");

    var router = require("express").Router();

    // Retrieve all alert level
    router.get("/", niveauAlerte.findAll);

    // Retrieve a single alert level with id
    router.get("/:id", niveauAlerte.findOne);

    app.use('/api/niveauAlerte', router);
};