// ../controllers/horario.controller.js
const Horario = require("../models/horario.model.js");

// Create and Save a new Horario
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Horario
  const horario = new Horario({
    grado: req.body.grado,
    grupo: req.body.grupo,
    nombreMateria: req.body.nombreMateria,
    hora: req.body.hora,
    fecha: req.body.fecha
  });

  // Save Horario in the database
  Horario.create(horario, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Horario."
      });
    else res.send(data);
  });
};

// Retrieve all Horarios from the database
exports.findAll = (req, res) => {
  Horario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving horarios."
      });
    else res.send(data);
  });
};

// Find a single Horario with an id
exports.findOne = (req, res) => {
  Horario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Horario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Horario with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Horario identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const horario = new Horario({
    grado: req.body.grado,
    grupo: req.body.grupo,
    nombreMateria: req.body.nombreMateria,
    hora: req.body.hora,
    fecha: req.body.fecha
  });

  Horario.updateById(req.params.id, horario, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Horario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating Horario with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Delete a Horario with the specified id in the request
exports.delete = (req, res) => {
  Horario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Horario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Horario with id " + req.params.id
        });
      }
    } else res.send({ message: `Horario was deleted successfully!` });
  });
};

// Delete all Horarios from the database
exports.deleteAll = (req, res) => {
  Horario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all horarios."
      });
    else res.send({ message: `All Horarios were deleted successfully!` });
  });
};
