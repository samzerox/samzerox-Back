var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var experienciaSchema = new Schema({
    empresa: { type: String, required: false },
    cargo: { type: String, required: false },
    duracion: { type: String, required: false },
    actividades: [{ type: Schema.Types.ObjectId, ref: 'Actividad' }],
    // actividades: { type: Schema.Types.Array, ref: 'Actividad' }

});

module.exports = mongoose.model('Experiencia', experienciaSchema)