var express = require('express');

var app = express();

var Tecnologia = require('../models/tecnologia');




//======================================
// Obtener todos los datos
//======================================
app.get('/', (req, res) => {
    Tecnologia.find({})
        .exec({}, (err, tecnologia) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el tecnologia',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                tecnologia: tecnologia,
            });


        });
});

module.exports = app;