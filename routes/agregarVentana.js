var express = require('express');

var app = express();

var Proyecto = require('../models/proyecto');

var mdAutenticacion = require('../middlewares/autenticacion');


//======================================
// Agregar Ventana a proyecto
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

        if (body.ventanas[0].length > 0) {
            proyecto.ventanas.push(body.ventanas[0]);
        }

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



module.exports = app;