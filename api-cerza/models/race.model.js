const sql = require("./db.js");

// constructor
const Race = function(race) {
    this.idRace = race.idRace;
    this.libelleRace = race.libelleRace;
    this.descriptionRace = race.descriptionRace;
    this.origine = race.origine;
    this.regime = race.regime;
    this.milieuDeVie = race.milieuDeVie;
    this.gestation = race.gestation;
    this.tailleMoy = race.tailleMoy;
    this.poidsMoy = race.poidsMoy;
    this.esperenceDeVie = race.esperenceDeVie;
    this.imgRace = race.imgRace;
}

Race.findById = (raceId, result) => {
    sql.query(`SELECT idRace, libelleRace, descriptionRace, origine, regime, milieuDeVie, gestation, tailleMoy, poidsMoy, esperenceDeVie, imgRace FROM race
    WHERE idRace = ${raceId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log("found race: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        // not found Race with the id
        result({ kind: "not_found" }, null);
    });
};

Race.getAll = result => {
    sql.query('SELECT idRace, libelleRace, descriptionRace, origine, regime, milieuDeVie, gestation, tailleMoy, poidsMoy, esperenceDeVie, imgRace FROM race'
    , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("races: ", res);
        result(null, res);
    });
};



module.exports = Race;