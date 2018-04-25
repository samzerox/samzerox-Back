var express = require('express');

var app = express();

var Experiencia = require('../models/experiencia');

var mdAutenticacion = require('../middlewares/autenticacion');


//======================================
// Obtener todas las experiencias
//======================================
app.get('/', (req, res) => {
    Experiencia.find({})
        .populate('actividades')
        .exec({}, (err, experiencia) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el experiencia',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                experiencia: experiencia,
            });


        });
});


//======================================
// Obtener Experiencia por Id
//======================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Experiencia.findById(id)
        .exec((err, experiencia) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar experiencia',
                    errors: err
                });
            }
            if (!experiencia) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la experiencia con el id ' + id + 'no existe',
                    errors: { message: 'No existe una experiencia con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                experiencia: experiencia
            });
        });
});


//======================================
// Actualizar una experiencia
//======================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Experiencia.findById(id, (err, experiencia) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar experiencia',
                errors: err
            });
        }

        if (!experiencia) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la experiencia con el id ' + id + ' no existe',
                errors: { message: 'No existe una experiencia con ese ID' }
            });
        }

        experiencia.empresa = body.empresa;
        experiencia.cargo = body.cargo;
        experiencia.duracion = body.duracion;
        experiencia.actividades = body.actividades;

        experiencia.save((err, experienciaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar experiencia',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Experiencia actualizada correctamente',
                experiencia: experienciaGuardado
            });
        });
    });
});


//======================================
// Crear una nueva experiencia
//======================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var experiencia = new Experiencia({
        empresa: body.empresa,
        cargo: body.cargo,
        duracion: body.duracion,
        actividades: body.actividades

    })

    experiencia.save((err, experienciaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la experiencia',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Experiencia creada correctamente',
            experiencia: experienciaGuardado,
        });
    });
});


//======================================
// Eliminar una experiencia
//======================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Experiencia.findByIdAndRemove(id, (err, experienciaBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar la experiencia',
                errors: err
            });
        }

        if (!experienciaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una experiencia con ese id',
                errors: { message: 'No existe una experiencia con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Experiencia eliminada correctamente',
            experiencia: experienciaBorrado
        });
    });

});





module.exports = app;