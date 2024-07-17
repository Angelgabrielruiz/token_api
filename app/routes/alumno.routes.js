module.exports = app => {
  const alumno = require("../controllers/alumno.controller.js");
  var router = require("express").Router();


  const authMiddleware = require('../middleware/auth');
  
  // Define las rutas CRUD para los alumnos
  router.post("/",authMiddleware.verifyToken, alumno.create,); // Crear un nuevo Alumno
  router.get("/",authMiddleware.verifyToken, alumno.findAll,); // Obtener todos los Alumnos
  router.get("/:id",authMiddleware.verifyToken, alumno.findOne,); // Obtener un Alumno por su id
  router.put("/:id",authMiddleware.verifyToken, alumno.update,); // Actualizar un Alumno por su id
  router.delete("/:id",authMiddleware.verifyToken, alumno.delete,); // Eliminar un Alumno por su id
  router.delete("/",authMiddleware.verifyToken, alumno.deleteAll,); // Eliminar todos los Alumnos

  app.use('/api/alumno', router);
  };
  
  