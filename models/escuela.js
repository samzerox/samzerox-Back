var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var escuelaSchema = new Schema({
    nombre: { type: String, required: false },
    titulo: { type: String, required: false },
    duracion: { type: String, required: false }
});

module.exports = mongoose.model('Escuela', escuelaSchema);