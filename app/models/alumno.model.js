const sql = require("./db.js");

// Constructor
const Alumno = function(alumno) {
  this.nombre = alumno.nombre;
  this.apellido = alumno.apellido;
  this.edad = alumno.edad;
  this.discapacidad = alumno.discapacidad;
  this.descripcionDiscapacidad = alumno.descripcionDiscapacidad;
  this.direccion = alumno.direccion;
  this.nombreTutor = alumno.nombreTutor;
  this.StatusReinscripcion = alumno.StatusReinscripcion;
  this.curp = alumno.curp;
  this.sexo  = alumno.sexo;
};

// Create a new Alumno
Alumno.create = (newAlumno, result) => {
  sql.query("INSERT INTO Alumno SET ?", newAlumno, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newAlumno });
  });
};

// Retrieve all Alumnos
Alumno.getAll = (result) => {
  console.log("alumno");
  sql.query("SELECT * FROM Alumno", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// Find Alumno by ID
Alumno.findById = (id, result) => {
  sql.query("SELECT * FROM Alumno WHERE id = ?", [id], (err, res) => {
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

// Update Alumno by ID
Alumno.updateById = (id, alumno, result) => {
  sql.query(
    "UPDATE Alumno SET nombre = ?, apellido = ?, edad = ?, discapacidad = ?, descripcionDiscapacidad = ?, direccion = ?, nombreTutor = ?, StatusReinscripcion = ?, curp = ?, sexo = ? WHERE id = ?",
    [alumno.nombre, alumno.apellido, alumno.edad, alumno.discapacidad, alumno.descripcionDiscapacidad, alumno.direccion, alumno.nombreTutor, alumno.StatusReinscripcion, alumno.curp, alumno.sexo, id],
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
      result(null, { id: id, ...alumno });
    }
  );
};

// Remove Alumno by ID
Alumno.remove = (id, result) => {
  sql.query("DELETE FROM Alumno WHERE id = ?", id, (err, res) => {
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

// Remove all Alumnos
Alumno.removeAll = (result) => {
  sql.query("DELETE FROM Alumno", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Alumno;
