const sql = require("./db.js");

// Constructor
const Tutor = function(tutor) {
  this.nombreAlumno = tutor.nombreAlumno;
  this.nombreTutor = tutor.nombreTutor;
  this.numTelefonoTutor = tutor.numTelefonoTutor;
  this.direccion = tutor.direccion;
};

// Create a new Tutor
Tutor.create = (newTutor, result) => {
  sql.query("INSERT INTO Tutores SET ?", newTutor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newTutor });
  });
};

// Retrieve all Tutores
Tutor.getAll = (result) => {
  sql.query("SELECT * FROM Tutores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// Find Tutor by ID
Tutor.findById = (id, result) => {
  sql.query("SELECT * FROM Tutores WHERE id = ?", [id], (err, res) => {
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

// Update Tutor by ID
Tutor.updateById = (id, tutor, result) => {
  sql.query(
    "UPDATE Tutores SET nombreAlumno = ?, nombreTutor = ?, numTelefonoTutor = ?, direccion = ? WHERE id = ?",
    [tutor.nombreAlumno, tutor.nombreTutor, tutor.numTelefonoTutor, tutor.direccion, id],
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
      result(null, { id: id, ...tutor });
    }
  );
};

// Remove Tutor by ID
Tutor.remove = (id, result) => {
  sql.query("DELETE FROM Tutores WHERE id = ?", id, (err, res) => {
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

// Remove all Tutores
Tutor.removeAll = (result) => {
  sql.query("DELETE FROM Tutores", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Tutor;
