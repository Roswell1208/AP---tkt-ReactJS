const sql = require("./db.js");

// constructor
const Enclos = function(enclos) {
    this.codeEnclos = enclos.codeEnclos;
    this.emplacement = enclos.emplacement;
    this.capacite = enclos.capacite;
}

Enclos.getAll = result => {
    sql.query(`SELECT codeEnclos, emplacement, capacite FROM enclos`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("enclos: ", res);
        result(null, res);
    });
};


Enclos.getListAnimaux = result => {
    sql.query(`SELECT codeAnimal, nomAnimal FROM animal`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("animaux: ", res);
        result(null, res);
    });
}

module.exports = Enclos;