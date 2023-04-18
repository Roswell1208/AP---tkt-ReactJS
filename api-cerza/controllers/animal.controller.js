const Animal = require("../models/animal.model.js");

// Create and Save a new Animal
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Animal
    const animal = new Animal({
        codeAnimal: req.body.codeAnimal,
        nomAnimal: req.body.nomAnimal,
        taille: req.body.taille,
        poids: req.body.poids,
        age: req.body.age,
        etatSante_idEtatSante: req.body.etatSante_idEtatSante,
        commentaireEtatSante: req.body.commentaireEtatSante,
        race_idRace: req.body.race_idRace,
        enclos_codeEnclos: req.body.enclos_codeEnclos
    });

    // Save Animal in the database
    Animal.create(animal, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Animal."
            });
        else res.send(data);
    });
};

exports.findByRace = (req, res) => {
    Animal.findByRace(req.params.idRace, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Animal with id ${req.params.idRace}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Animal with id " + req.params.idRace
                });
            }
        } else res.send(data);
    });
};


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

// Update a Animal by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Animal.updateById(
        req.params.id,
        new Animal(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Animal with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Animal with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Animal with the specified id in the request
exports.delete = (req, res) => {
    Animal.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Animals with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Animals with id " + req.params.id
                });
            }
        } else res.send({ message: `Animals was deleted successfully!` });
    });
};

// Delete all Animals from the database.
exports.deleteAll = (req, res) => {
    Animal.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Animals."
            });
        else res.send({ message: `All Animals were deleted successfully!` });
    });
};