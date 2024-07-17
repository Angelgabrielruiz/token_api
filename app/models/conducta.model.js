const sql = require("./db.js");

// Constructor
const Conducta = function(conducta) {
  this.nombreAlumno = conducta.nombreAlumno;
  this.grado = conducta.grado;
  this.grupo = conducta.grupo;
  this.motivo = conducta.motivo;
  this.descripcion = conducta.descripcion;
};

// Create a new Conducta
Conducta.create = (newConducta, result) => {
  sql.query("INSERT INTO Conducta SET ?", newConducta, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newConducta });
  });
};

// Retrieve all Conductas
Conducta.getAll = (result) => {
  sql.query("SELECT * FROM Conducta", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// Find Conducta by ID
Conducta.findById = (id, result) => {
  sql.query("SELECT * FROM Conducta WHERE id = ?", [id], (err, res) => {
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

// Update Conducta by ID
Conducta.updateById = (id, conducta, result) => {
  sql.query(
    "UPDATE Conducta SET nombreAlumno = ?, grado = ?, grupo = ?, motivo = ?, descripcion = ? WHERE id = ?",
    [conducta.nombreAlumno, conducta.grado, conducta.grupo, conducta.motivo, conducta.descripcion, id],
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
      result(null, { id: id, ...conducta });
    }
  );
};

// Remove Conducta by ID
Conducta.remove = (id, result) => {
  sql.query("DELETE FROM Conducta WHERE id = ?", id, (err, res) => {
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

// Remove all Conductas
Conducta.removeAll = (result) => {
  sql.query("DELETE FROM Conducta", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Conducta;
