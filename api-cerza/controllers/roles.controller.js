const Roles = require("../models/roles.model.js");

// Create and Save a new Role
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Role
    const role = new Roles({
        libelleRole: req.body.libelleRole
    });

    // Save Role in the database
    Roles.create(role, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Role."
            });
        else res.send(data);
    });
};


// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
    Roles.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving roles."
            });
        else res.send(data);
    });
};

// Find a single Role with an id
exports.findOne = (req, res) => {
    Roles.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Role with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Role with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Role by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Roles.updateById(
        req.params.id,
        new Roles(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Roles with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Roles with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Roles with the specified id in the request
exports.delete = (req, res) => {
    Roles.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Role with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Role with id " + req.params.id
                });
            }
        } else res.send({ message: `Role was deleted successfully!` });
    });
};

// Delete all Roles from the database.
exports.deleteAll = (req, res) => {
    Roles.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Roles."
            });
        else res.send({ message: `All Roles were deleted successfully!` });
    });
};