const sql = require("./db.js");

// constructor
const Race = function(race) {
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

Race.create = (newRace, result) => {
    sql.query("INSERT INTO race SET ?", newRace, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("created race: ", { id: res.insertId, ...newRace });
        result(null, {id: res.insertId, ...newRace});
    });
};

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

Race.updateById = (id, race, result) => {
    sql.query("UPDATE race SET libelleRace = ?, descriptionRace = ?, origine = ?, regime = ?, milieuDeVie = ?, gestation = ?, tailleMoy = ?, poidsMoy = ?, esperenceDevie = ?, imgRace = ? WHERE idRace = ?", 
    [race.libelleRace, race.descriptionRace, race.origine, race.regime, race.milieuDeVie, race.gestation, race.tailleMoy, race.poidsMoy, race.esperenceDeVie, race.imgRace, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Race with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("updated race: ", { id: id, ...race });
        result(null, { id: id, ...race });
    });
};

Race.remove = (id, result) => {
    sql.query("DELETE FROM race WHERE idRace = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Race with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("deleted race with id: ", id);
        result(null, res);
    });
};

Race.removeAll = result => {
    sql.query("DELETE FROM race", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log(`deleted ${res.affectedRows} races`);
        result(null, res);
    });
};



module.exports = Race;