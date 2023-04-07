const sql = require("./db.js");

// constructor
const NiveauAlerte = function(niveauAlerte) {
    this.idNiveauAlerte = niveauAlerte.idNiveauAlerte;
    this.libelleNiveauAlerte = niveauAlerte.libelleNiveauAlerte;
}

NiveauAlerte.findById = (niveauAlerteId, result) => {
    sql.query(`SELECT idNiveauAlerte, libelleNiveauAlerte FROM niveaualerte WHERE idNiveauAlerte = ${niveauAlerteId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log("found alert level: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        // not found alert level with the id
        result({ kind: "not_found" }, null);
    });
};

NiveauAlerte.getAll = result => {
    sql.query('SELECT idNiveauAlerte, libelleNiveauAlerte FROM niveaualerte'
    , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("alert level: ", res);
        result(null, res);
    });
};



module.exports = NiveauAlerte;