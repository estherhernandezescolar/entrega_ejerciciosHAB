require("dotenv").config();

//importamos funcion
const { getData } = require("./controllers/got");

//importamos librerías
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const { PORT } = process.env;

//importamos los controladores a aplicar sobre las rutas
const register = require("./controllers/register");
const login = require("./controllers/login");
const { got } = require("./controllers/got");
const filter =  require("./controllers/filter");

//importamos middlewares
const userAuthorized = require("./middleware/auth");

//utilizamos librerías sobre express-app
app.use(morgan("dev"));
app.use(bodyParser.json());

//aplicamos diferentes rutas
//landing
app.get("/", (req, res) => res.send("llega"));

//register
app.post("/register", register);

//login
app.post("/login", login);

//ruta restringida
app.get("/got", userAuthorized, got);

//ruta redirigida login
app.get("/login", (req, res) => res.send("login"));

//ruta para filtrar
app.get("/got/:category", filter);

//gestionamos error
app.use((error, req, res, next) => {
    res.send(`Tienes el siguiente error: ${error.message}`);
});

//gestionamos ruta no encontrada
app.use((req, res) => res.status(404).send("Página no encontrada"));

app.listen(PORT, () => {
    console.log(`tenemos el puerto ${PORT} funcionando`);
});


