var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var experienciaSchema = new Schema({
    nombre: { type: String, required: false },
    cargo: { type: String, required: false },
    duracion: { type: String, required: false },
    descripcion: { type: String, required: false },
    actividades: { type: Object, required: false },
});

module.exports = mongoose.model('Experiencia', experienciaSchema);