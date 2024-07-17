const Asistencia = require("../models/asistencia.model.js");

// Crear y guardar una nueva asistencia
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  // Crear una asistencia
  const asistencia = new Asistencia({
    Asistencia: req.body.Asistencia,
    fecha: req.body.fecha 
  });

  // Guardar la asistencia en la base de datos
  Asistencia.create(asistencia, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear la asistencia."
      });
    else res.send(data);
  });
};

// Obtener todas las asistencias de la base de datos
exports.findAll = (req, res) => {
  Asistencia.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar las asistencias."
      });
    else res.send(data);
  });
};

// Encontrar una asistencia por su ID
exports.findOne = (req, res) => {
  Asistencia.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró la asistencia con ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar la asistencia con ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Actualizar una asistencia por su ID
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  // Actualizar la asistencia en la base de datos
  Asistencia.updateById(
    req.params.id,
    new Asistencia(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró la asistencia con ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar la asistencia con ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar una asistencia por su ID
exports.delete = (req, res) => {
  Asistencia.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró la asistencia con ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar la asistencia con ID " + req.params.id
        });
      }
    } else res.send({ message: `¡La asistencia se eliminó correctamente!` });
  });
};

// Eliminar todas las asistencias de la base de datos
exports.deleteAll = (req, res) => {
  Asistencia.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al eliminar todas las asistencias."
      });
    else res.send({ message: `¡Todas las asistencias se eliminaron correctamente!` });
  });
};

// Obtener la combinación de datos de Alumno y Asistencia
exports.findAlumnoAsistencia = (req, res) => {
  Asistencia.getAlumnoAsistencia((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los datos."
      });
    else res.send(data);
  });
};
