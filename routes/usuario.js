var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();

var Usuario = require('../models/usuario');

var mdAutenticacion = require('../middlewares/autenticacion');




//======================================
// Obtener todos los datos
//======================================
app.get('/', (req, res) => {
    Usuario.find({})
        .populate('habilidades')
        .populate('escuelas')
        .populate({ path: 'experiencias', populate: { path: 'actividades' } })
        .populate('cursos')
        .exec({}, (err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando el usuario',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                usuario: usuario,
            });


        });
});


//======================================
// Obtener Usuario por Id
//======================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Usuario.findById(id)
        .populate('habilidades')
        .populate('escuelas')
        .populate({ path: 'experiencias', populate: { path: 'actividades' } })
        .populate('cursos')
        .exec((err, usuario) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }
            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'la usuario con el id ' + id + 'no existe',
                    errors: { message: 'No existe una usuario con ese ID' }
                });
            }
            res.status(200).json({
                ok: true,
                usuario: usuario
            });
        });
});

// ======================================
// Actualizar un usuario
// ======================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }
        console.log(body);

        usuario.password = bcrypt.hashSync(body.password, 10),

            console.log(usuario);


        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            res.status(200).json({
                ok: true,
                message: "Se actualizo el usuario",
                usuario: usuarioGuardado
            });

        });

    });

});


//======================================
// Crear una nueva usuario
//======================================
app.post('/', (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        titulo: body.titulo,
        tel: body.tel,
        correo: body.correo,
        password: body.password,
        pProfesional: body.pProfesional,
        hDescripcion: body.hDescripcion,
        fDescripcion: body.fDescripcion,


    })

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear el usuario',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
        });
    });
});


//======================================
// Eliminar un usuario
//======================================
app.delete('/:id', (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar la usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una usuario con ese id',
                errors: { message: 'No existe una usuario con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            mensaje: 'Usuario Eliminado',
            usuario: usuarioBorrado
        });
    });

});





module.exports = app;