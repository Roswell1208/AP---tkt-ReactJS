const sql = require("./db.js");

// constructor
const etatSante = function(etatsante) {
    this.idEtatSante = etatsante.idEtatSante;
    this.libelleEtatSante = etatsante.libelleEtatSante;
}

etatSante.findById = (etatSanteId, result) => {
    sql.query(`SELECT idEtatSante, libelleEtatSante FROM etatsante WHERE idEtatSante  = ${etatSanteId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found etatSante: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found etatSante with the id
        result({ kind: "not_found" }, null);
    });
};


etatSante.getAll = result => {
    sql.query('SELECT idEtatSante, libelleEtatSante FROM etatsante'
    , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("etatSante: ", res);
        result(null, res);
    });
};




module.exports = etatSante;