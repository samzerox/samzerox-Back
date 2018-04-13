var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var perfilSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    imagen: { type: String, required: false },
    titulo: { type: String, required: false },
    correo: { type: String, required: false },
    tel: { type: String, required: false },
    perfil: { type: String, required: false },
    educacion: { type: Schema.Types.ObjectId, ref: 'Educacion', required: true },
    experiencia: { type: Schema.Types.ObjectId, ref: 'Experiencia', required: true },
    formacion: { type: Schema.Types.ObjectId, ref: 'Formacion', required: true },
    habilid: { type: Schema.Types.ObjectId, ref: 'Habilidad', required: true },

});

module.exports = mongoose.model('Perfil', perfilSchema);