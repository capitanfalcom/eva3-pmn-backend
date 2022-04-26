const { now } = require("mongoose");
const db = require("../models");
const Paciente = db.paciente;

var validator = require('validator');

// Create and Save a new Paciente
exports.create = (req, res) => {

    // Validate request
    if (!req.body.rut && !req.body.nombre) {
        res.status(400).send({ message: "Contenido no puede estar vacio!" });
        return;
    }

    // Create a Paciente
    const paciente = new Paciente({
        rut: req.body.rut,
        nombre: req.body.nombre,
        edad: req.body.edad,
        sexo: req.body.sexo,
        fotoPersonal: req.body.fotoPersonal,
        fechaIngreso: now(),
        enfermedad: req.body.enfermedad,
        revisado: req.body.revisado ? req.body.revisado : false
    });

    // Save Paciente in the database
    paciente
        .save(paciente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al crear el Paciente."
            });
        });
};

// Retrieve all Paciente from the database.
exports.findAll = (req, res) => {
    const rut = req.query.rut;
    var condition = rut ? { rut: { $regex: new RegExp(rut), $options: "i" } } : {};

    Paciente.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ah ocurrido un error al guardar el Paciente."
            });
        });
};

// Find a single Paciente with an rut
exports.findOne = (req, res) => {
    const rut = req.params.rut;
    console.log(rut);

    Paciente.findOne(rut)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "No existe el Paciente con el rut: " + rut });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error al recuperar el Paciente con rut: " + rut + err });
        });
};

// Update a Paciente by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Los datos para actualizar no pueden estar vacíos!"
        });
    }

    const rut = req.params.rut;

    Paciente.findOneAndUpdate(rut, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `No se puede actualizar el paciente con rut: ${rut}. Quizás no se encontró el paciente!`
                });
            } else res.send({ message: "Paciente se actualizó con éxito." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al actualizar el paciente con rut: " + rut + "-----" + err
            });
        });
};

// Delete a Paciente with the specified id in the request
exports.delete = (req, res) => {
    const rut = req.params.rut;

    Paciente.findOneAndRemove(rut)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `No se puede eliminar el paciente con rut: ${rut}. Quizás no se encontró el paciente!`
                });
            } else {
                res.send({
                    message: "Paciente borrado correctamente!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo borrar Paciente con rut: " + rut
            });
        });
};

// Delete all Paciente from the database.
exports.deleteAll = (req, res) => {
    Paciente.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Pacientes borrados correctamente!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Hubo un error al borrar los pacientes."
            });
        });
};

// Find all published Paciente
/* exports.findAllPublished = (req, res) => {
    Paciente.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Se produjo un error al recuperar los pacientes."
            });
        });
}; */