var express = require('express');

var app = express();

var Habilidad = require('../models/habilidad');




//======================================
// Obtener todos las habilidades
//======================================
app.get('/', (req, res) => {
    Habilidad.find({})
        .exec({}, (err, habilidad) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el habilidad',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                habilidad: habilidad,
            });


        });
});

module.exports = app;