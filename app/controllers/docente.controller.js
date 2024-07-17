const Docente = require("../models/docente.model.js");

// Create and Save a new Docente
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Docente
  const docente = new Docente({
    Nombre: req.body.Nombre,
    id: req.body.id,
    Apellido: req.body.Apellido,
    matricula: req.body.matricula,
    grado: req.body.grado,
    Grupo: req.body.Grupo
  });

  // Save Docente in the database
  Docente.create(docente, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Docente."
      });
    else res.send(data);
  });
};

// Retrieve all Docentes from the database.
exports.findAll = (req, res) => {
  Docente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving docentes."
      });
    else res.send(data);
  });
};

// Find a single Docente by Id
exports.findOne = (req, res) => {
  Docente.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Docente with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Docente with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Docente identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Docente.updateById(
    req.params.id,
    new Docente(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Docente with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Docente with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Docente with the specified id in the request
exports.delete = (req, res) => {
  Docente.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Docente with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Docente with id " + req.params.id
        });
      }
    } else res.send({ message: `Docente was deleted successfully!` });
  });
};

// Delete all Docentes from the database.
exports.deleteAll = (req, res) => {
  Docente.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all docentes."
      });
    else res.send({ message: `All Docentes were deleted successfully!` });
  });
};
