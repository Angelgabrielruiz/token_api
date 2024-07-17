module.exports = app => {
    const actividades = require("../controllers/actividad.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Actividad
    router.post("/", actividades.create);
  
    // Retrieve all Actividades
    router.get("/", actividades.findAll);
  
    // Retrieve a single Actividad with id
    router.get("/:id", actividades.findOne);
  
    // Update an Actividad with id
    router.put("/:id", actividades.update);
  
    // Delete an Actividad with id
    router.delete("/:id", actividades.delete);
  
    // Delete all Actividades
    router.delete("/", actividades.deleteAll);
  
    app.use('/api/actividades', router);
  };
  