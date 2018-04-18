var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var proyectoSchema = new Schema({
    proyecto: { type: String, required: false },
    imgPortada: { type: String, required: false },
    descripcion: { type: String, required: false },
    link: { type: String, required: false },
    tecnologias: { type: Schema.Types.ObjectId, ref: 'Tecnologia' },
    ventanas: { type: Schema.Types.ObjectId, ref: 'Ventana' }
});

module.exports = mongoose.model('Proyecto', proyectoSchema);