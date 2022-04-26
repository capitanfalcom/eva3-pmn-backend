module.exports = mongoose => {
    const Paciente = mongoose.model(
        "paciente",
        mongoose.Schema({
            rut: String,
            nombre: String,
            edad: Number,
            sexo: String,
            fotoPersonal: String,
            fechaIngreso: Date,
            enfermedad: String,
            revisado: Boolean,
        }, { timestamps: true })
    );

    return Paciente;
};