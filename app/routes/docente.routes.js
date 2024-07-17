module.exports = app => {
  const docentes = require("../controllers/docente.controller.js");

  var router = require("express").Router();

  
  // Define las rutas CRUD para los docentes
  router.post("/", docentes.create); // Crear un nuevo Docente
  router.get("/", docentes.findAll); // Obtener todos los Docentes
  router.get("/:id", docentes.findOne); // Obtener un Docente por su id
  router.put("/:id", docentes.update); // Actualizar un Docente por su id
  router.delete("/:id", docentes.delete); // Eliminar un Docente por su id
  router.delete("/", docentes.deleteAll);

    app.use('/api/docentes', router);
  };
  