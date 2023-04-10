module.exports = app => {
    const etatSante = require("../controllers/etatSante.controller.js");

    var router = require("express").Router();

    // Retrieve all etatSante
    router.get("/", etatSante.findAll);

    // Retrieve a single etatSante with id
    router.get("/:id", etatSante.findOne);

    app.use('/api/etatSante', router);

};