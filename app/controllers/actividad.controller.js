const Actividad = require("../models/actividad.model.js");

// Create and Save a new Actividad
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an Actividad
  const actividad = new Actividad({
    fecha: req.body.fecha,
    materia: req.body.materia,
    descripcion: req.body.descripcion,
    puntaje: req.body.puntaje,
    nombreActividad: req.body.nombreActividad,
    id: req.body.id,
    trimestre: req.body.trimestre
  });

  // Save Actividad in the database
  Actividad.create(actividad, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Actividad."
      });
    else res.send(data);
  });
};

// Retrieve all Actividades from the database (with condition).
exports.findAll = (req, res) => {
  const nombreActividad = req.query.nombreActividad;

  Actividad.getAll(nombreActividad, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving actividades."
      });
    else res.send(data);
  });
};

// Find a single Actividad with an id
exports.findOne = (req, res) => {
  Actividad.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Actividad with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Actividad with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update an Actividad identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  console.log(req.body);

  Actividad.updateById(
    req.params.id,
    new Actividad(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Actividad with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Actividad with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Actividad with the specified id in the request
exports.delete = (req, res) => {
  Actividad.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Actividad with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Actividad with id " + req.params.id
        });
      }
    } else res.send({ message: `Actividad was deleted successfully!` });
  });
};

// Delete all Actividades from the database
exports.deleteAll = (req, res) => {
  Actividad.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all actividades."
      });
    else res.send({ message: `All Actividades were deleted successfully!` });
  });
};
