const sql = require("./db.js");

// constructor
const User = function(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.lastname = user.lastname;
    this.firstname = user.firstname;
    this.roles_idRole = user.roles_idRole;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, {id: res.insertId, ...newUser});
    });
};

User.findById = (userId, result) => {
    sql.query(`SELECT username, email, password, lastname, firstname, roles_idRole FROM user WHERE username = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        
        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    sql.query("SELECT username, email, password, lastname, firstname, roles_idRole FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("users: ", res);
        result(null, res);
    });
};

User.getList = result => {
    sql.query("SELECT username, lastname, firstname FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log("users: ", res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query("UPDATE user SET username = ?, email = ?, password = ?, lastname = ?, firstname = ?, roles_idRole = ? WHERE username = ?", [user.username, user.email, user.password, user.lastname, user.firstname, user.roles_idRole, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
    });
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE username = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};

module.exports = User;