var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var habilidadSchema = new Schema({
    nombre: { type: String, required: false }
}, { collection: 'habilidades' });

module.exports = mongoose.model('Habilidad', habilidadSchema);