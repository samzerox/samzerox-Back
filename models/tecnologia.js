var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tecnologiaSchema = new Schema({
    nombre: { type: String, required: false },
    codigo: { type: String, required: false }

});

module.exports = mongoose.model('Tecnologia', tecnologiaSchema);