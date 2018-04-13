var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var proyectoSchema = new Schema({
    nombre: { type: String, required: false },
    portada: { type: String, required: false },
    tecnologias: { type: Object, required: false },
    descripcion: { type: String, required: false },
    ventanas: { type: Object, required: false },
    link: { type: String, required: false },
});

module.exports = mongoose.model('Proyecto', proyectoSchema);