var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    titulo: { type: String, required: false },
    imagen: { type: String, required: false },
    correo: { type: String, required: false },
    tel: { type: String, required: false },
    pProfesional: { type: String, required: false },
    escuelas: [{ type: Schema.Types.ObjectId, ref: 'Escuela' }],
    experiencias: [{ type: Schema.Types.ObjectId, ref: 'Experiencia' }],
    hDescripcion: { type: String, required: false },
    habilidades: [{ type: Schema.Types.ObjectId, ref: 'Habilidad' }],
    fDescripcion: { type: String, required: false },
    cursos: [{ type: Schema.Types.ObjectId, ref: 'Curso' }]



});

module.exports = mongoose.model('Usuario', usuarioSchema);