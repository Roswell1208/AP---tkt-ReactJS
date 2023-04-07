module.exports = app => {
    const enclos = require("../controllers/enclos.controller.js");

    var router = require("express").Router();

    // Retrieve all Enclos
    router.get("/", enclos.findAll);

    // Retrieve all animals
    router.get("/animaux", enclos.findListAnimaux);

    app.use('/api/enclos', router);
};