const sql = require("./db.js");

// Constructor
const Asistencia = function(asistencia) {
  this.Asistencia = asistencia.Asistencia;
  this.fecha = asistencia.fecha;
};

// Método para crear una nueva asistencia
Asistencia.create = (newAsistencia, result) => {
  sql.query("INSERT INTO Asistencia SET ?", newAsistencia, (err, res) => {
    if (err) {
      console.log("Error al crear una asistencia: ", err);
      result(err, null);
      return;
    }

    console.log("Asistencia creada: ", { id: res.insertId, ...newAsistencia });
    result(null, { id: res.insertId, ...newAsistencia });
  });
};

// Método para obtener todas las asistencias
Asistencia.getAll = result => {
  sql.query("SELECT * FROM Asistencia", (err, res) => {
    if (err) {
      console.log("Error al recuperar asistencias: ", err);
      result(err, null);
      return;
    }

    console.log("Asistencia: ", res);
    result(null, res);
  });
};

// Método para encontrar una asistencia por su ID
Asistencia.findById = (asistenciaId, result) => {
  sql.query(`SELECT * FROM Asistencia WHERE id = ${asistenciaId}`, (err, res) => {
    if (err) {
      console.log("Error al recuperar Asistencia con ID: ", asistenciaId, err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Asistencia encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    // No se encontró la asistencia con el ID especificado
    result({ kind: "not_found" }, null);
  });
};

// Método para actualizar una asistencia por su ID
Asistencia.updateById = (id, asistencia, result) => {
  sql.query(
    "UPDATE Asistencia SET Asistencia = ?, fecha = ? WHERE id = ?",
    [asistencia.Asistencia, asistencia.fecha, id],
    (err, res) => {
      if (err) {
        console.log("Error al actualizar Asistencia: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // No se encontró la asistencia con el ID especificado
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Asistencia actualizada: ", { id: id, ...asistencia });
      result(null, { id: id, ...asistencia });
    }
  );
};

// Método para eliminar una asistencia por su ID
Asistencia.remove = (id, result) => {
  sql.query("DELETE FROM Asistencia WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error al eliminar Asistencia: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // No se encontró la asistencia con el ID especificado
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Asistencia eliminada con ID: ", id);
    result(null, res);
  });
};

// Método para eliminar todas las asistencias
Asistencia.removeAll = result => {
  sql.query("DELETE FROM Asistencia", (err, res) => {
    if (err) {
      console.log("Error al eliminar todas las Asistencias: ", err);
      result(err, null);
      return;
    }

    console.log(`Se eliminaron ${res.affectedRows} asistencias.`);
    result(null, res);
  });
};

// Método para obtener la combinación de datos de Alumno y Asistencia
Asistencia.getAlumnoAsistencia = result => {
  sql.query(`
    select Alumno.nombre,
    Alumno.apellido,
    Asistencia.asistencia,
    Asistencia.fecha 
    from Asistencia 
    inner join Alumno 
    on Asistencia.id = Alumno.id;
    ` , (err,res) =>{
      if(err) {
        console.log("error" , err)
        result(err,null)
        return;
      }
      result(null,res);
    }
  )
};

module.exports = Asistencia;
