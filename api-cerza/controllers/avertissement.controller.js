const Avertissement = require("../models/avertissement.model.js");

// Create and Save a new Avertissement
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Avertissement
    const avertissement = new Avertissement({
        idAvertissement: req.body.idAvertissement,
        descriptionAvertissement: req.body.descriptionAvertissement,
        niveauAlerte_idNiveauAlerte: req.body.niveauAlerte_idNiveauAlerte
    });

    // Save Avertissement in the database
    Avertissement.create(avertissement, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Avertissement."
            });
        else res.send(data);
    });
};

// Retrieve all Avertissements from the database.
exports.findAll = (req, res) => {
    Avertissement.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving avertissements."
            });
        else res.send(data);
    });
};

// Find a single Avertissement with an id
exports.findOne = (req, res) => {
    Avertissement.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Avertissement with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Avertissement with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Avertissement by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Avertissement.updateById(
        req.params.id,
        new Avertissement(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Avertissement with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Avertissement with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Avertissement with the specified id in the request
exports.delete = (req, res) => {
    Avertissement.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Avertissement with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Avertissement with id " + req.params.id
                });
            }
        } else res.send({ message: `Avertissement was deleted successfully!` });
    });
};

// Delete all Avertissements from the database.
exports.deleteAll = (req, res) => {
    Avertissement.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Avertissements."
            });
        else res.send({ message: `All Avertissements were deleted successfully!` });
    });
};