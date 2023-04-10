const Race = require("../models/race.model.js");

// Create and Save a new Race
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Race
    const race = new Race({
        libelleRace: req.body.libelleRace,
        descriptionRace: req.body.descriptionRace,
        origine: req.body.origine,
        regime: req.body.regime,
        milieuDeVie: req.body.milieuDeVie,
        gestation: req.body.gestation,
        tailleMoy: req.body.tailleMoy,
        poidsMoy: req.body.poidsMoy,
        esperenceDeVie: req.body.esperenceDeVie,
        imgRace: req.body.imgRace
    });

    // Save Race in the database
    Race.create(animal, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Race."
            });
        else res.send(data);
    });
};


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

// Update a Race by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Race.updateById(
        req.params.id,
        new Race(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Race with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Race with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Race with the specified id in the request
exports.delete = (req, res) => {
    Race.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Races with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Races with id " + req.params.id
                });
            }
        } else res.send({ message: `Races was deleted successfully!` });
    });
};

// Delete all Races from the database.
exports.deleteAll = (req, res) => {
    Race.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Races."
            });
        else res.send({ message: `All Races were deleted successfully!` });
    });
};