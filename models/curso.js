var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursoSchema = new Schema({
    nombre: { type: String, required: false },
    link: { type: String, required: false }
});

module.exports = mongoose.model('Curso', cursoSchema);