var express = require('express');

var app = express();

var Experiencia = require('../models/experiencia');




//======================================
// Obtener todos los datos
//======================================
app.get('/', (req, res) => {
    Experiencia.find({})
        .populate('actividades')
        .exec({}, (err, experiencia) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el experiencia',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                experiencia: experiencia,
            });


        });
});

module.exports = app;