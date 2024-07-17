const Alumno = require("../models/alumno.model.js");

// Create and Save a new Alumno
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;

  }

  // Create an Alumno
  const alumno = new Alumno({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    edad: req.body.edad,
    discapacidad: req.body.discapacidad,
    descripcionDiscapacidad: req.body.descripcionDiscapacidad,
    direccion: req.body.direccion,
    nombreTutor: req.body.nombreTutor,
    StatusReinscripcion: req.body.StatusReinscripcion,
    curp: req.body.curp,
    sexo: req.body.sexo
  });

  // Save Alumno in the database
  Alumno.create(alumno, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Alumno."
      });
    else res.send(data);
  });
};

// Retrieve all Alumnos from the database.
exports.findAll = (req, res) => {
  Alumno.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving alumnos."
      });
    else res.send(data);
  });
};

// Find a single Alumno by Id
exports.findOne = (req, res) => {
  Alumno.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Alumno with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Alumno with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update an Alumno identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Alumno.updateById(
    req.params.id,
    new Alumno(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Alumno with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Alumno with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete an Alumno with the specified id in the request
exports.delete = (req, res) => {
  Alumno.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Alumno with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Alumno with id " + req.params.id
        });
      }
    } else res.send({ message: `Alumno was deleted successfully!` });
  });
};

// Delete all Alumnos from the database.
exports.deleteAll = (req, res) => {
  Alumno.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all alumnos."
      });
    else res.send({ message: `All Alumnos were deleted successfully!` });
  });
};