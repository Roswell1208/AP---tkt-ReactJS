const sql = require("./db.js");

// constructor
const Avertissement = function(avertissement) {
    this.idAvertissement = avertissement.idAvertissement;
    this.descriptionAvertissement = avertissement.descriptionAvertissement;
    this.niveauAlerte_idNiveauAlerte = avertissement.niveauAlerte_idNiveauAlerte;
}

Avertissement.create = (newAvertissement, result) => {
    sql.query("INSERT INTO avertissement SET ?", newAvertissement, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("created avertissement: ", { id: res.insertId, ...newAvertissement });
        result(null, {id: res.insertId, ...newAvertissement});
    });
};

Avertissement.findById = (AvertissementId, result) => {
    sql.query(`SELECT idAvertissement, descriptionAvertissement, niveauAlerte_idNiveauAlerte FROM avertissement WHERE idAvertissement = ${AvertissementId} ORDER BY niveauAlerte_idNiveauAlerte DESC`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log("found avertissement: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        // not found Avertissement with the id
        result({ kind: "not_found" }, null);
    });
};

Avertissement.getAll = result => {
    sql.query("SELECT idAvertissement, descriptionAvertissement, niveauAlerte_idNiveauAlerte FROM avertissement ORDER BY niveauAlerte_idNiveauAlerte DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("avertissements: ", res);
        result(null, res);
    });
};

Avertissement.updateById = (id, avertissement, result) => {
    sql.query("UPDATE avertissement SET descriptionAvertissement = ?, niveauAlerte_idNiveauAlerte = ? WHERE idAvertissement = ?", [avertissement.descriptionAvertissement, avertissement.niveauAlerte_idNiveauAlerte, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Avertissement with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("updated avertissement: ", { id: id, ...avertissement });
        result(null, { id: id, ...avertissement });
    });
};

Avertissement.remove = (id, result) => {
    sql.query("DELETE FROM avertissement WHERE idAvertissement = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Avertissement with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("deleted avertissement with id: ", id);
        result(null, res);
    });
};

Avertissement.removeAll = result => {
    sql.query("DELETE FROM avertissement", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log(`deleted ${res.affectedRows} avertissements`);
        result(null, res);
    });
};

module.exports = Avertissement;