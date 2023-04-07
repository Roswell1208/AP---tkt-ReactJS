module.exports = app => {
    const animal = require("../controllers/animal.controller.js");

    var router = require("express").Router();

    // Retrieve all Animals
    router.get("/", animal.findAll);

    // Retrieve a single Animal with id
    router.get("/:id", animal.findOne);

    app.use('/api/animals', router);
};