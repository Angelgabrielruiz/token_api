module.exports = app => {
    const tutores = require("../controllers/tutores.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutor
    router.post("/", tutores.create);
  
    // Retrieve all Tutores
    router.get("/", tutores.findAll);
  
    // Retrieve a single Tutor with id
    router.get("/:id", tutores.findOne);
  
    // Update a Tutor with id
    router.put("/:id", tutores.update);
  
    // Delete a Tutor with id
    router.delete("/:id", tutores.delete);
  
    // Delete all Tutores
    router.delete("/", tutores.deleteAll);
  
    app.use('/api/tutores', router);
  };
  