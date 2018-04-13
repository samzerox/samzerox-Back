var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var formacionSchema = new Schema({
    descripcion: { type: String, required: false },
    cursos: { type: Object, required: false },
});

module.exports = mongoose.model('Formacion', formacionSchema);