const Conducta = require("../models/conducta.model.js");

// Create and Save a new Conducta
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Conducta
  const conducta = new Conducta({
    nombreAlumno: req.body.nombreAlumno,
    grado: req.body.grado,
    grupo: req.body.grupo,
    motivo: req.body.motivo,
    descripcion: req.body.descripcion
  });

  // Save Conducta in the database
  Conducta.create(conducta, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Conducta."
      });
    else res.send(data);
  });
};

// Retrieve all Conductas from the database.
exports.findAll = (req, res) => {
  Conducta.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving conductas."
      });
    else res.send(data);
  });
};

// Find a single Conducta by Id
exports.findOne = (req, res) => {
  Conducta.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Conducta with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Conducta with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Conducta identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Conducta.updateById(
    req.params.id,
    new Conducta(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Conducta with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Conducta with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Conducta with the specified id in the request
exports.delete = (req, res) => {
  Conducta.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Conducta with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Conducta with id " + req.params.id
        });
      }
    } else res.send({ message: `Conducta was deleted successfully!` });
  });
};

// Delete all Conductas from the database.
exports.deleteAll = (req, res) => {
  Conducta.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all conductas."
      });
    else res.send({ message: `All Conductas were deleted successfully!` });
  });
};
