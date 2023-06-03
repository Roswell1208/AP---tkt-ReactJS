module.exports = app => {
    const roles = require("../controllers/roles.controller.js");

    var router = require("express").Router();

    // Create a new Role
    router.post("/", roles.create);

    // Retrieve all Roles
    router.get("/", roles.findAll);

    // Retrieve a single Role with id
    router.get("/:id", roles.findOne);

    // Update an role with id
    router.put("/:id", roles.update);

    // Delete an role with id
    router.delete("/:id", roles.delete);
    
    // Delete all roles
    router.delete("/", roles.deleteAll);

    app.use('/api/roles', router);
};