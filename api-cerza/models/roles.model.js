const sql = require("./db.js");

// constructor
const Roles = function(roles) {
    this.idRole = roles.idRole;
    this.libelleRole = roles.libelleRole;
}

Roles.create = (newRoles, result) => {
    sql.query("INSERT INTO roles SET ?", newRoles, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("created roles: ", { id: res.insertId, ...newRoles});
        result(null, {id: res.insertId, ...newRoles});
    });
};

Roles.findById = (rolesId, result) => {
    sql.query(`SELECT idRole, libelleRole FROM roles
    WHERE idRole = ${rolesId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log("found roles: ", res[0]); 
            result(null, res[0]); // retourne qu'un seul resultat car idRoles est unique
            return;
        }
        
        // not found Role with the id
        result({ kind: "not_found" }, null);
    });
};

Roles.getAll = result => {
    sql.query('SELECT idRole, libelleRole FROM roles'
    , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("roles: ", res);
        result(null, res);
    });
};

Roles.updateById = (id, roles, result) => {
    sql.query("UPDATE roles SET libelleRole = ?", 
    [roles.libelleRole, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Roles with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("updated roles: ", { id: id, ...roles });
        result(null, { id: id, ...roles });
    });
};

Roles.remove = (id, result) => {
    sql.query("DELETE FROM roles WHERE idRole = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found Role with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("deleted role with id: ", id);
        result(null, res);
    });
};

Roles.removeAll = result => {
    sql.query("DELETE FROM roles", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log(`deleted ${res.affectedRows} roles`);
        result(null, res);
    });
};




module.exports = Roles;