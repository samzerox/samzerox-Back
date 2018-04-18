var express = require('express');

var app = express();

var Proyecto = require('../models/proyecto');



//======================================
// Obtener todos los datos
//======================================
app.get('/', (req, res) => {
    Proyecto.find()
        .populate('tecnologias')
        .populate('ventanas')
        .exec({}, (err, proyecto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el proyecto',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                proyecto: proyecto,
            });


        });
});

module.exports = app;