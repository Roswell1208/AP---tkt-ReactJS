const sql = require("./db.js");

// constructor
const Animal = function(animal) {
    this.codeAnimal = animal.codeAnimal;
    this.nomAnimal = animal.nomAnimal;
    this.taille = animal.taille;
    this.poids = animal.poids;
    this.age = animal.age;
    this.enclos_codeEnclos = animal.enclos_codeEnclos;
    this.libelleEtatSante = animal.libelleEtatSante;
    this.libelleRace = animal.libelleRace;
}

Animal.findById = (animalId, result) => {
    sql.query(`SELECT codeAnimal, nomAnimal, taille, poids, age, libelleEtatSante, libelleRace, enclos_codeEnclos FROM animal 
    INNER JOIN etatSante ON idEtatSante = etatSante_idEtatSante
    INNER JOIN race ON idRace = race_idRace
    WHERE codeAnimal = ${animalId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log("found animal: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        // not found Animal with the id
        result({ kind: "not_found" }, null);
    });
};

Animal.getAll = result => {
    sql.query('SELECT codeAnimal, nomAnimal, taille, poids, age, libelleEtatSante, libelleRace, enclos_codeEnclos FROM animal INNER JOIN etatSante ON idEtatSante = etatSante_idEtatSante INNER JOIN race ON idRace = race_idRace'
    , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("animals: ", res);
        result(null, res);
    });
};



module.exports = Animal;