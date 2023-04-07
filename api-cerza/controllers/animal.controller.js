const Animal = require("../models/animal.model.js");

// Retrieve all Animals from the database.
exports.findAll = (req, res) => {
    Animal.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving animals."
            });
        else res.send(data);
    });
};

// Find a single Animal with an id
exports.findOne = (req, res) => {
    Animal.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Animal with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Animal with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};