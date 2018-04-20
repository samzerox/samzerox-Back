var express = require('express');

var app = express();

var Usuario = require('../models/usuario');




//======================================
// Obtener todos los datos
//======================================
app.get('/', (req, res) => {
    Usuario.find({})
        .populate('habilidades')
        .populate('escuelas')
        .populate({ path: 'experiencias', populate: { path: 'actividades' } })
        .populate('cursos')
        .exec({}, (err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el usuario',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                usuario: usuario,
            });


        });
});


//======================================
// Obtener Tecnologia por Id
//======================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Usuario.findById(id)
        .populate('habilidades')
        .populate('escuelas')
        .populate({ path: 'experiencias', populate: { path: 'actividades' } })
        .populate('cursos')
        .exec((err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la usuario con el id ' + id + 'no existe',
                    errors: { message: 'No existe una usuario con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                usuario: usuario
            });
        });
});

module.exports = app;