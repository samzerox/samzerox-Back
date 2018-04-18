var express = require('express');

var app = express();

var Ventana = require('../models/ventana');




//======================================
// Obtener todos los datos
//======================================
app.get('/', (req, res) => {
    Ventana.find({})
        .exec({}, (err, ventana) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el ventana',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                ventana: ventana,
            });


        });
});

module.exports = app;