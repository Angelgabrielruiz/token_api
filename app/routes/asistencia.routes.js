module.exports = app => {
  const asistencias = require("../controllers/asistencia.controller.js");

  var router = require("express").Router();

  // Crear una nueva asistencia
  router.post("/", asistencias.create);

  // Obtener todas las asistencias
  router.get("/", asistencias.findAll);

  // Obtener una asistencia por su ID
  router.get("/:id", asistencias.findOne);

  // Actualizar una asistencia por su ID
  router.put("/:id", asistencias.update);

  // Eliminar una asistencia por su ID
  router.delete("/:id", asistencias.delete);

  // Eliminar todas las asistencias
  router.delete("/", asistencias.deleteAll);

  // Obtener la combinación de datos de Alumno y Asistencia
  router.get("/join/alumno-asistencia", asistencias.findAlumnoAsistencia);

  app.use('/api/asistencia', router);
};
