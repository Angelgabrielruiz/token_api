const sql = require("./db.js");

// constructor
const Actividad = function(actividad) {
  this.fecha = actividad.fecha;
  this.materia = actividad.materia;
  this.descripcion = actividad.descripcion;
  this.puntaje = actividad.puntaje;
  this.nombreActividad = actividad.nombreActividad;
  this.id = actividad.id;
  this.trimestre = actividad.trimestre;
};

Actividad.create = (newActividad, result) => {
  sql.query("INSERT INTO Actividades SET ?", newActividad, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created actividad: ", { id: res.insertId, ...newActividad });
    result(null, { id: res.insertId, ...newActividad });
  });
};

Actividad.findById = (id, result) => {
  sql.query(`SELECT * FROM Actividades WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found actividad: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Actividad with the id
    result({ kind: "not_found" }, null);
  });
};

Actividad.getAll = (nombreActividad, result) => {
  let query = "SELECT * FROM Actividades";

  if (nombreActividad) {
    query += ` WHERE nombreActividad LIKE '%${nombreActividad}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("actividades: ", res);
    result(null, res);
  });
};

Actividad.updateById = (id, actividad, result) => {
  sql.query(
    "UPDATE Actividades SET fecha = ?, materia = ?, descripcion = ?, puntaje = ?, nombreActividad = ?, trimestre = ? WHERE id = ?",
    [actividad.fecha, actividad.materia, actividad.descripcion, actividad.puntaje, actividad.nombreActividad, actividad.trimestre, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Actividad with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated actividad: ", { id: id, ...actividad });
      result(null, { id: id, ...actividad });
    }
  );
};

Actividad.remove = (id, result) => {
  sql.query("DELETE FROM Actividades WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Actividad with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted actividad with id: ", id);
    result(null, res);
  });
};

Actividad.removeAll = result => {
  sql.query("DELETE FROM Actividades", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} actividades`);
    result(null, res);
  });
};

module.exports = Actividad;
