const sql = require("./db.js");

// Constructor
const Docente = function(docente) {
  this.Nombre = docente.Nombre;
  this.id = docente.id;
  this.Apellido = docente.Apellido;
  this.matricula = docente.matricula;
  this.grado = docente.grado;
  this.Grupo = docente.Grupo;
};

// Create a new Docente
Docente.create = (newDocente, result) => {
  sql.query("INSERT INTO Docente SET ?", newDocente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newDocente });
  });
};

// Retrieve all Docentes
Docente.getAll = (result) => {
  sql.query("SELECT * FROM Docente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// Find Docente by ID
Docente.findById = (id, result) => {
  sql.query("SELECT * FROM Docente WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

// Update Docente by ID
Docente.updateById = (id, docente, result) => {
  sql.query(
    "UPDATE Docente SET Nombre = ?, Apellido = ?, matricula = ?, grando = ?, Grupo = ? WHERE id = ?",
    [docente.Nombre, docente.Apellido, docente.matricula, docente.grado, docente.Grupo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...docente });
    }
  );
};

// Remove Docente by ID
Docente.remove = (id, result) => {
  sql.query("DELETE FROM Docente WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

// Remove all Docentes
Docente.removeAll = (result) => {
  sql.query("DELETE FROM Docente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Docente;
