const Mission = require("../models/missions.model.js");

// Create and Save a new Mission
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Mission
    const mission = new Mission({
        idMission: req.body.idMission,
        descriptionMission: req.body.descriptionMission,
        dateEcheanceMission: req.body.dateEcheanceMission,
        commentaireMission: req.body.commentaireMission,
        estEffectuee: req.body.estEffectuee,
        user_username: req.body.user_username,
        prioriteMission_idPriorite: req.body.prioriteMission_idPriorite,
        animal_codeAnimal: req.body.animal_codeAnimal,
        enclos_codeEnclos: req.body.enclos_codeEnclos
    });

    // Save Mission in the database
    Mission.create(mission, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Mission."
            });
        else res.send(data);
    });
};

// Retrieve all Missions from the database.
exports.findAll = (req, res) => {
    Mission.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving missions."
            });
        else res.send(data);
    });
};

exports.findListAnimaux = (req, res) => {
    Mission.getListAnimaux((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving animals."
            });
        else res.send(data);
    });
};

exports.findListEnclos = (req, res) => {
    Mission.getListEnclos((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving enclos."
            });
        else res.send(data);
    });
};

// Find a single Mission with an id
exports.findOne = (req, res) => {
    Mission.findByUsername(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Mission with username ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Mission with username " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a Mission by the id in the request
exports.updateState = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Mission.updateStateById(
        req.params.id,
        req.params.state,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Mission with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Mission with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

exports.updateCommentary = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Mission.addCommentaryById(
        req.params.id,
        req.params.comment,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Mission with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Mission with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a User with the specified id in the request
/*exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.id
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        else res.send({ message: `All Users were deleted successfully!` });
    });
};*/