const etatSante = require("../models/etatSante.model.js");

// Retrieve all etatSante from the database.
exports.findAll = (req, res) => {
    etatSante.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving etatSante."
            });
        else res.send(data);
    });
};

// Find a single etatSante with an id
exports.findOne = (req, res) => {
    etatSante.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found etatSante with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving etatSante with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};