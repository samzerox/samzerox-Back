var express = require('express');

var app = express();

var Curso = require('../models/curso');




//======================================
// Obtener todos los datos
//======================================
app.get('/', (req, res) => {
    Curso.find({})
        .exec({}, (err, curso) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el curso',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                curso: curso,
            });


        });
});

module.exports = app;