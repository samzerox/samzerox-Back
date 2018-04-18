var express = require('express');

var app = express();

var Escuela = require('../models/escuela');




//======================================
// Obtener todos los datos
//======================================
app.get('/', (req, res) => {
    Escuela.find({})
        .exec({}, (err, escuela) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el escuela',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                escuela: escuela,
            });


        });
});

module.exports = app;