var express = require('express');

var app = express();

var Actividad = require('../models/actividad');




//======================================
// Obtener todos los datos
//======================================
app.get('/', (req, res) => {
    Actividad.find({})
        .exec({}, (err, actividad) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el actividad',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                actividad: actividad,
            });


        });
});

module.exports = app;