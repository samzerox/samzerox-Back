var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var actividadSchema = new Schema({
    nombre: { type: String, required: false }
}, { collection: 'actividades' });

module.exports = mongoose.model('Actividad', actividadSchema);