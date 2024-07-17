module.exports = app => {
    const conductas = require("../controllers/conducta.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Conducta
    router.post("/", conductas.create);
  
    // Retrieve all Conductas
    router.get("/", conductas.findAll);
  
    // Retrieve a single Conducta with id
    router.get("/:id", conductas.findOne);
  
    // Update a Conducta with id
    router.put("/:id", conductas.update);
  
    // Delete a Conducta with id
    router.delete("/:id", conductas.delete);
  
    // Delete all Conductas
    router.delete("/", conductas.deleteAll);
  
    app.use('/api/conductas', router);
  };
  