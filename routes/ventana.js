var express = require('express');

var app = express();

var Ventana = require('../models/ventana');




//======================================
// Obtener todos los datos
//======================================
app.get('/', (req, res) => {
    Ventana.find({})
        .exec({}, (err, ventana) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el ventana',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                ventana: ventana,
            });


        });
});


//======================================
// Obtener Tecnologia por Id
//======================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Ventana.findById(id)
        .exec((err, ventana) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar ventana',
                    errors: err
                });
            }
            if (!ventana) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la ventana con el id ' + id + 'no existe',
                    errors: { message: 'No existe una ventana con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                ventana: ventana
            });
        });
});


//======================================
// Actualizar una tecnologia
//======================================
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Ventana.findById(id, (err, ventana) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar ventana',
                errors: err
            });
        }

        if (!ventana) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la ventana con el id ' + id + ' no existe',
                errors: { message: 'No existe una ventana con ese ID' }
            });
        }

        ventana.titulo = body.titulo;
        ventana.descripcion = body.descripcion;

        ventana.save((err, ventanaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar ventana',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                ventana: ventanaGuardado
            });
        });
    });
});


//======================================
// Crear una nuevo tecnologia
//======================================
app.post('/', (req, res) => {

    var body = req.body;

    var ventana = new Ventana({
        titulo: body.titulo,
        descripcion: body.descripcion

    })

    ventana.save((err, ventanaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el ventana',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            ventana: ventanaGuardado,
        });
    });
});


//======================================
// Eliminar una ventana
//======================================
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Ventana.findByIdAndRemove(id, (err, ventanaBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaaje: 'Error al borrar la ventana',
                errors: err
            });
        }

        if (!ventanaBorrado) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe una ventana con ese id',
                errors: { message: 'No existe una ventana con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            ventana: ventanaBorrado
        });
    });

});





module.exports = app;