var express = require('express');

var app = express();

var Habilidad = require('../models/habilidad');

var mdAutenticacion = require('../middlewares/autenticacion');


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


//======================================
// Obtener habilidad por Id
//======================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Habilidad.findById(id)
        .exec((err, habilidad) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar habilidad',
                    errors: err
                });
            }
            if (!habilidad) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la habilidad con el id ' + id + 'no existe',
                    errors: { message: 'No existe una habilidad con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                habilidad: habilidad
            });
        });
});


//======================================
// Actualizar una habilidad
//======================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Habilidad.findById(id, (err, habilidad) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar habilidad',
                errors: err
            });
        }

        if (!habilidad) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la habilidad con el id ' + id + ' no existe',
                errors: { message: 'No existe una habilidad con ese ID' }
            });
        }

        habilidad.nombre = body.nombre;

        habilidad.save((err, habilidadGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar habilidad',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Habilidad actualizada correctamente',
                habilidad: habilidadGuardado
            });
        });
    });
});


//======================================
// Crear una nueva habilidad
//======================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var habilidad = new Habilidad({
        nombre: body.nombre
    })

    habilidad.save((err, habilidadGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la habilidad',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Habilidad creada correctamente',
            habilidad: habilidadGuardado,
        });
    });
});


//======================================
// Eliminar una habilidad
//======================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Habilidad.findByIdAndRemove(id, (err, habilidadBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar la habilidad',
                errors: err
            });
        }

        if (!habilidadBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una habilidad con ese id',
                errors: { message: 'No existe una habilidad con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            habilidad: habilidadBorrado
        });
    });

});




module.exports = app;