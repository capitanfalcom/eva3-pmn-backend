const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

/* config storage multer */
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'app/public/img'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const app = express();

const db = require("./app/models");
const { BADNAME } = require("dns");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectado a la base de datos!");
    })
    .catch(err => {
        console.log("No se puede conectar a la base de datos!", err);
        process.exit();
    });

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// MULTER usage
app.use(multer({
    storage,
    dest: path.join(__dirname, 'app/public/img')
}).single('imagen'));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Wena Choro." });
});
/* require de rutas por cada modelo */
require("./app/routes/paciente.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}.`);
});