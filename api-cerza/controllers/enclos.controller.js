const Enclos = require('../models/enclos.model.js');

exports.findAll = (req, res) => {
    Enclos.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving enclos."
            });
        else res.send(data);
    });
};

exports.findListAnimaux = (req, res) => {
    Enclos.getListAnimaux((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving animals."
            });
        else res.send(data);
    });
}