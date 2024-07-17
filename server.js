const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "*",
 optionsSuccessStatus:200,
  credentials:true 
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/alumno.routes.js")(app);
require("./app/routes/docente.routes.js")(app);
require("./app/routes/actividad.routes.js")(app);
require("./app/routes/horario.routes.js")(app);
require("./app/routes/conducta.routes.js")(app);
require("./app/routes/asistencia.routes.js")(app);
require("./app/routes/tutores.routes.js")(app);

const authRoutes = require('./app/routes/auth.routes.js');

app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
