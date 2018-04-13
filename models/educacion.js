var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var educacionSchema = new Schema({
    escuela: { type: String, required: false },
    titulo: { type: String, required: false },
    duracion: { type: String, required: false }
});

module.exports = mongoose.model('Educacion', educacionSchema);