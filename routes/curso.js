var express = require('express');

var app = express();

var Curso = require('../models/curso');

var mdAutenticacion = require('../middlewares/autenticacion');


//======================================
// Obtener todos los cursos
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


//======================================
// Obtener Curso por Id
//======================================
app.get('/:id', (req, res) => {

    var id = req.params.id;

    Curso.findById(id)
        .exec((err, curso) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar curso',
                    errors: err
                });
            }
            if (!curso) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la curso con el id ' + id + 'no existe',
                    errors: { message: 'No existe una curso con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                curso: curso
            });
        });
});


//======================================
// Actualizar un curso
//======================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Curso.findById(id, (err, curso) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar curso',
                errors: err
            });
        }

        if (!curso) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la curso con el id ' + id + ' no existe',
                errors: { message: 'No existe una curso con ese ID' }
            });
        }

        curso.nombre = body.nombre;
        curso.link = body.link;

        curso.save((err, cursoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar curso',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Curso Actualizado correctamente',
                curso: cursoGuardado
            });
        });
    });
});


//======================================
// Crear un nuevo curso
//======================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var curso = new Curso({
        nombre: body.nombre,
        link: body.link

    })

    curso.save((err, cursoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el curso',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Curso creado correctamente',
            curso: cursoGuardado,
        });
    });
});


//======================================
// Eliminar un curso
//======================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Curso.findByIdAndRemove(id, (err, cursoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el curso',
                errors: err
            });
        }

        if (!cursoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un curso con ese id',
                errors: { message: 'No existe un curso con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Curso eliminado correctamente',
            curso: cursoBorrado
        });
    });

});




module.exports = app;