const Tutor = require("../models/tutores.model.js");

// Create and Save a new Tutor
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutor
  const tutor = new Tutor({
    nombreAlumno: req.body.nombreAlumno,
    nombreTutor: req.body.nombreTutor,
    numTelefonoTutor: req.body.numTelefonoTutor,
    direccion: req.body.direccion
  });

  // Save Tutor in the database
  Tutor.create(tutor, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutor."
      });
    else res.send(data);
  });
};

// Retrieve all Tutores from the database.
exports.findAll = (req, res) => {
  Tutor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutores."
      });
    else res.send(data);
  });
};

// Find a single Tutor by Id
exports.findOne = (req, res) => {
  Tutor.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutor with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Tutor identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Tutor.updateById(
    req.params.id,
    new Tutor(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutor with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tutor with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutor with the specified id in the request
exports.delete = (req, res) => {
  Tutor.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutor with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutor with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutor was deleted successfully!` });
  });
};

// Delete all Tutores from the database.
exports.deleteAll = (req, res) => {
  Tutor.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutores."
      });
    else res.send({ message: `All Tutores were deleted successfully!` });
  });
};
