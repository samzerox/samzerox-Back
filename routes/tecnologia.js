var express = require('express');

var app = express();

var Tecnologia = require('../models/tecnologia');

var mdAutenticacion = require('../middlewares/autenticacion');


//======================================
// Obtener todos las tecnologias
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


//======================================
// Obtener Tecnologia por Id
//======================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Tecnologia.findById(id)
        .exec((err, tecnologia) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar tecnologia',
                    errors: err
                });
            }
            if (!tecnologia) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la tecnologia con el id ' + id + 'no existe',
                    errors: { message: 'No existe una tecnologia con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                tecnologia: tecnologia
            });
        });
});


//======================================
// Actualizar una tecnologia
//======================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Tecnologia.findById(id, (err, tecnologia) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar tecnologia',
                errors: err
            });
        }

        if (!tecnologia) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la tecnologia con el id ' + id + ' no existe',
                errors: { message: 'No existe una tecnologia con ese ID' }
            });
        }

        tecnologia.nombre = body.nombre;
        tecnologia.codigo = body.codigo;

        tecnologia.save((err, tecnologiaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar tecnologia',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                tecnologia: tecnologiaGuardado
            });
        });
    });
});


//======================================
// Crear una nueva tecnologia
//======================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var tecnologia = new Tecnologia({
        nombre: body.nombre,
        codigo: body.codigo,

    })

    tecnologia.save((err, tecnologiaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la tecnologia',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            tecnologia: tecnologiaGuardado,
        });
    });
});


//======================================
// Eliminar una tecnologia
//======================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Tecnologia.findByIdAndRemove(id, (err, tecnologiaBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar la tecnologia',
                errors: err
            });
        }

        if (!tecnologiaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una tecnologia con ese id',
                errors: { message: 'No existe una tecnologia con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            tecnologia: tecnologiaBorrado
        });
    });

});



module.exports = app;