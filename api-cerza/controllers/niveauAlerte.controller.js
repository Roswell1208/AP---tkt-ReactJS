const NiveauAlerte = require("../models/niveauAlerte.model.js");

// Retrieve all alert level from the database.
exports.findAll = (req, res) => {
    NiveauAlerte.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving alert level."
            });
        else res.send(data);
    });
};

// Find a single alert level with an id
exports.findOne = (req, res) => {
    NiveauAlerte.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found alert level with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving alert level with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};