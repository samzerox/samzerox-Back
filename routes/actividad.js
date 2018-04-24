var express = require('express');

var app = express();

var Actividad = require('../models/actividad');




//======================================
// Obtener todas las actividades
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


//======================================
// Obtener Actividad por Id
//======================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Actividad.findById(id)
        .exec((err, actividad) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar actividad',
                    errors: err
                });
            }
            if (!actividad) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la actividad con el id ' + id + 'no existe',
                    errors: { message: 'No existe una actividad con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                actividad: actividad
            });
        });
});


//======================================
// Actualizar una Actividad
//======================================
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Actividad.findById(id, (err, actividad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar actividad',
                errors: err
            });
        }

        if (!actividad) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la actividad con el id ' + id + ' no existe',
                errors: { message: 'No existe una actividad con ese ID' }
            });
        }

        actividad.nombre = body.nombre;

        actividad.save((err, actividadGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar actividad',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Actividad actualizada correctamente',
                actividad: actividadGuardado
            });
        });
    });
});


//======================================
// Crear una nueva actividad
//======================================
app.post('/', (req, res) => {

    var body = req.body;

    var actividad = new Actividad({
        nombre: body.nombre,

    })

    actividad.save((err, actividadGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la actividad',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Actividad Creada Correctamente',
            actividad: actividadGuardado,
        });
    });
});


//======================================
// Eliminar una Actividad
//======================================
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Actividad.findByIdAndRemove(id, (err, actividadBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar la actividad',
                errors: err
            });
        }

        if (!actividadBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una actividad con ese id',
                errors: { message: 'No existe una actividad con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Actividad Eliminada',
            actividad: actividadBorrado
        });
    });

});



module.exports = app;