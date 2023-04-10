const sql = require("./db.js");

// constructor
const Animal = function(animal) {
    this.codeAnimal = animal.codeAnimal;
    this.nomAnimal = animal.nomAnimal;
    this.taille = animal.taille;
    this.poids = animal.poids;
    this.age = animal.age;
    this.etatSante_idEtatSante = animal.etatSante_idEtatSante;
    this.commentaireEtatSante = animal.commentaireEtatSante;
    this.race_idRace = animal.race_idRace;
    this.enclos_codeEnclos = animal.enclos_codeEnclos;
}

Animal.create = (newAnimal, result) => {
    sql.query("INSERT INTO animal SET ?", newAnimal, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("created animal: ", { id: res.insertId, ...newAnimal});
        result(null, {id: res.insertId, ...newAnimal});
    });
};

Animal.findById = (animalId, result) => {
    sql.query(`SELECT codeAnimal, nomAnimal, taille, poids, age, libelleEtatSante, commentaireEtatSante, libelleRace, enclos_codeEnclos FROM animal 
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

Animal.findByRace = (raceId, result) => {
    sql.query(`SELECT codeAnimal, nomAnimal FROM animal INNER JOIN race ON idRace = race_idRace WHERE idRace = ${raceId}`, (err, res) => {
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
    sql.query('SELECT codeAnimal, nomAnimal, taille, poids, age, libelleEtatSante, commentaireEtatSante, libelleRace, enclos_codeEnclos FROM animal INNER JOIN etatSante ON idEtatSante = etatSante_idEtatSante INNER JOIN race ON idRace = race_idRace'
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

Animal.updateById = (id, animal, result) => {
    sql.query("UPDATE animal SET poids = ?, etatSante_idEtatSante = ?, commentaireEtatSante = ? WHERE codeAnimal = ?", 
    [animal.poids, animal.idEtatSante, animal.commentaireEtatSante, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Animal with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("updated animal: ", { id: id, ...animal });
        result(null, { id: id, ...animal });
    });
};

Animal.remove = (id, result) => {
    sql.query("DELETE FROM animal WHERE codeAnimal = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Animal with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("deleted animal with id: ", id);
        result(null, res);
    });
};

Animal.removeAll = result => {
    sql.query("DELETE FROM animal", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log(`deleted ${res.affectedRows} animals`);
        result(null, res);
    });
};




module.exports = Animal;