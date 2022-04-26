module.exports = app => {
    const paciente = require("../controllers/paciente.controller.js");

    var router = require("express").Router();

    // Create a new paciente
    router.post("/", paciente.create);

    // Retrieve all pacientes
    router.get("/all", paciente.findAll);

    // Retrieve all published paciente
    /*  router.get("/published", paciente.findAllPublished); */

    // Retrieve a single paciente with rut
    router.get("/:rut", paciente.findOne);

    // Update a paciente with rut
    router.put("/:rut", paciente.update);

    // Delete a paciente with rut
    router.delete("/remove/:rut", paciente.delete);

    // Delete all pacientes
    router.delete("/all", paciente.deleteAll);

    app.use('/api/paciente', router);
};