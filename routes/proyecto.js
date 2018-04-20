var express = require('express');

var app = express();

var Proyecto = require('../models/proyecto');



//======================================
// Obtener todos los proyectos
//======================================
app.get('/', (req, res) => {
    Proyecto.find({}, 'nombre descripcion imagen tecnologias')
        .populate('tecnologias')
        // .populate('ventanas')
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


//======================================
// Obtener Proyecto por Id
//======================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Proyecto.findById(id)
        .populate('tecnologias')
        .populate('ventanas')
        .exec((err, proyecto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar proyecto',
                    errors: err
                });
            }
            if (!proyecto) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la proyecto con el id ' + id + 'no existe',
                    errors: { message: 'No existe una proyecto con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                proyecto: proyecto
            });
        });
});





module.exports = app;