const sql = require("./db.js");

// constructor
const Mission = function(mission) {
    this.idMission = mission.idMission;
    this.descriptionMission = mission.descriptionMission;
    this.dateEcheanceMission = mission.dateEcheanceMission;
    this.commentaireMission = mission.commentaireMission;
    this.estEffectuee = mission.estEffectuee;
    this.user_username = mission.user_username;
    this.prioriteMission_idPriorite = mission.prioriteMission_idPriorite;
    this.animal_codeAnimal = mission.animal_codeAnimal;
    this.enclos_codeEnclos = mission.enclos_codeEnclos;
}

Mission.create = (newMission, result) => {
    sql.query("INSERT INTO missions SET ?", newMission, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("created mission: ", { id: res.insertId, ...newMission });
        result(null, {id: res.insertId, ...newMission});
    });
};

Mission.findByUsername = (userId, result) => {
    sql.query(`SELECT idMission, descriptionMission, dateEcheanceMission, commentaireMission, estEffectuee, 
    user_username, prioriteMission_idPriorite, libellePriorite, animal_codeAnimal, nomAnimal, missions.enclos_codeEnclos
    FROM missions
    LEFT JOIN animal ON missions.animal_codeAnimal = animal.codeAnimal
    INNER JOIN prioritemission ON missions.prioriteMission_idPriorite = prioritemission.idPriorite
    WHERE user_username = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log("found missions: ", res);
            result(null, res);
            return;
        }
        
        // not found Mission with the username
        result({ kind: "not_found" }, null);
    });
};

Mission.getAll = result => {
    sql.query(`SELECT idMission, descriptionMission, dateEcheanceMission, commentaireMission, estEffectuee, 
    user_username, prioriteMission_idPriorite, libellePriorite, animal_codeAnimal, nomAnimal, missions.enclos_codeEnclos
    FROM missions
    LEFT JOIN animal ON missions.animal_codeAnimal = animal.codeAnimal
    INNER JOIN prioritemission ON missions.prioriteMission_idPriorite = prioritemission.idPriorite
    ORDER BY estEffectuee ASC, prioriteMission_idPriorite DESC, idMission ASC;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("missions: ", res);
        result(null, res);
    });
};

Mission.updateStateById = (id, state, result) => {
    sql.query("UPDATE missions SET estEffectuee = " + state + " WHERE idMission = " + id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Mission with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("updated mission state: ", { id: id, ...state });
        result(null, { id: id, ...state });
    });
};

Mission.addCommentaryById = (id, commentary, result) => {
    sql.query("UPDATE missions SET commentaireMission = " + commentary + " WHERE idMission = " + id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Mission with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated mission commentary: ", { id: id, ...commentary });
        result(null, { id: id, ...commentary });
    });
};

module.exports = Mission;