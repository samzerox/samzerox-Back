var express = require('express');

var app = express();

var Proyecto = require('../models/proyecto');

var mdAutenticacion = require('../middlewares/autenticacion');


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


//======================================
// Actualizar un proyecto
//======================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Proyecto.findById(id, (err, proyecto) => {
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
                mensaje: 'la proyecto con el id ' + id + ' no existe',
                errors: { message: 'No existe una proyecto con ese ID' }
            });
        }

        proyecto.nombre = body.nombre;
        proyecto.descripcion = body.descripcion;
        proyecto.link = body.link;

        proyecto.save((err, proyectoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar proyecto',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Proyecto actualizado correctamente',
                proyecto: proyectoGuardado
            });
        });
    });
});


//======================================
// Crear un nuevo proyecto
//======================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var proyecto = new Proyecto({
        nombre: body.nombre,
        descripcion: body.descripcion,
        link: body.link

    })

    proyecto.save((err, proyectoGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la proyecto',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            mensaje: 'Proyecto creado correctamente',
            proyecto: proyectoGuardado,
        });
    });
});


//======================================
// Eliminar un proyecto
//======================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Proyecto.findByIdAndRemove(id, (err, proyectoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar el proyecto',
                errors: err
            });
        }

        if (!proyectoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un proyecto con ese id',
                errors: { message: 'No existe un proyecto con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Proyecto eliminado correctamente',
            proyecto: proyectoBorrado
        });
    });

});





module.exports = app;