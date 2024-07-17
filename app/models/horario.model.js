// ../models/horario.model.js
const sql = require("./db.js");

// Constructor
const Horario = function(horario) {
  this.grado = horario.grado;
  this.grupo = horario.grupo;
  this.nombreMateria = horario.nombreMateria;
  this.hora = horario.hora;
  this.fecha = horario.fecha;
};

// Métodos estáticos para operaciones en la base de datos
Horario.create = (newHorario, result) => {
  sql.query("INSERT INTO Horario SET ?", newHorario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Horario: ", { id: res.insertId, ...newHorario });
    result(null, { id: res.insertId, ...newHorario });
  });
};

Horario.findById = (horarioId, result) => {
  sql.query(`SELECT * FROM Horario WHERE id = ${horarioId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Horario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Horario with the id
    result({ kind: "not_found" }, null);
  });
};

Horario.getAll = (result) => {
  sql.query("SELECT * FROM Horario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("horarios: ", res);
    result(null, res);
  });
};

Horario.updateById = (id, horario, result) => {
  sql.query(
    "UPDATE Horario SET grado = ?, grupo = ?, nombreMateria = ?, hora = ?, fecha = ? WHERE id = ?",
    [horario.grado, horario.grupo, horario.nombreMateria, horario.hora, horario.fecha, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Horario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Horario: ", { id: id, ...horario });
      result(null, { id: id, ...horario });
    }
  );
};

Horario.remove = (id, result) => {
  sql.query("DELETE FROM Horario WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Horario with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Horario with id: ", id);
    result(null, res);
  });
};

Horario.removeAll = (result) => {
  sql.query("DELETE FROM Horario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} horario`);
    result(null, res);
  });
};

module.exports = Horario;
