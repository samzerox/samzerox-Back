var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ventanaSchema = new Schema({
    titulo: { type: String, required: false },
    imagen: { type: String, required: false },
    descripcion: { type: String, required: false }
});

module.exports = mongoose.model('Ventana', ventanaSchema)