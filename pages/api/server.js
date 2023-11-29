const express = require("express");
const cors = require("cors"); // Importa el módulo cors
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8080;

const app = express();

// Habilita CORS para todas las rutas
app.use(cors());

// Habilita el analizador de cuerpo para aceptar datos json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Agrega el enrutador al servidor y nómbralo openai
app.use("/openai", require("./router"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Exporta la API de express
module.exports = app;
