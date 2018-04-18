var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursoSchema = new Schema({
    curso: { type: String, required: false },
    link: { type: String, required: false }
});

module.exports = mongoose.model('Curso', cursoSchema);