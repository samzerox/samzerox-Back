var express = require('express');

var app = express();

var Escuela = require('../models/escuela');

var mdAutenticacion = require('../middlewares/autenticacion');


//======================================
// Obtener todas las Escuelas
//======================================
app.get('/', (req, res) => {
    Escuela.find({})
        .exec({}, (err, escuela) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando la escuela',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                escuela: escuela,
            });


        });
});


//======================================
// Obtener Escuela por Id
//======================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Escuela.findById(id)
        .exec((err, escuela) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar escuela',
                    errors: err
                });
            }
            if (!escuela) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la escuela con el id ' + id + 'no existe',
                    errors: { message: 'No existe una escuela con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                escuela: escuela
            });
        });
});


//======================================
// Actualizar una Escuela
//======================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Escuela.findById(id, (err, escuela) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar escuela',
                errors: err
            });
        }

        if (!escuela) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la escuela con el id ' + id + ' no existe',
                errors: { message: 'No existe una escuela con ese ID' }
            });
        }

        escuela.nombre = body.nombre;
        escuela.titulo = body.titulo;
        escuela.duracion = body.duracion;

        escuela.save((err, escuelaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar escuela',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Escuela actualizada correctamente',
                escuela: escuelaGuardado
            });
        });
    });
});


//======================================
// Crear una nueva escuela
//======================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var escuela = new Escuela({
        nombre: body.nombre,
        titulo: body.titulo,
        duracion: body.duracion,

    })

    escuela.save((err, escuelaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la escuela',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Escuela creada correctamente',
            escuela: escuelaGuardado,
        });
    });
});


//======================================
// Eliminar una escuela
//======================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Escuela.findByIdAndRemove(id, (err, escuelaBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar la escuela',
                errors: err
            });
        }

        if (!escuelaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una escuela con ese id',
                errors: { message: 'No existe una escuela con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'escuela eliminada correctamente',
            escuela: escuelaBorrado
        });
    });

});




module.exports = app;