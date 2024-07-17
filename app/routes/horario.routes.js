// ../routes/horario.routes.js
module.exports = app => {

 const horarios = require("../controllers/horario.controller.js");
    var router = require("express").Router();

 // Crear un nuevo horario
router.post("/", horarios.create);

// Obtener todos los horarios
router.get("/", horarios.findAll);

// Obtener un horario por su ID
router.get("/:id", horarios.findOne);

// Actualizar un horario por su ID
router.put("/:id", horarios.update);

// Eliminar un horario por su ID
router.delete("/:id", horarios.delete);

// Eliminar todos los horarios
router.delete("/", horarios.deleteAll);


app.use('/api/horario', router);


  };
  