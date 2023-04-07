const Race = require("../models/race.model.js");

// Retrieve all Races from the database.
exports.findAll = (req, res) => {
    Race.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving races."
            });
        else res.send(data);
    });
};

// Find a single Race with an id
exports.findOne = (req, res) => {
    Race.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Race with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Race with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};