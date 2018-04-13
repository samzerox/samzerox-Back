var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var habilidadSchema = new Schema({
    descripcion: { type: String, required: false },
    habilidades: { type: Object, required: false },
});

module.exports = mongoose.model('Habilidad', habilidadSchema);