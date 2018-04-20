var express = require('express');
var fileUpload = require('express-fileupload');

//La usamos para borrar la imagen antigua
var fs = require('fs');

var app = express();


var Usuario = require('../models/usuario');
var Ventana = require('../models/ventana');
var Proyecto = require('../models/proyecto');




// default options
app.use(fileUpload());


app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    //Tipos de coleccion
    var tiposValidos = ['capturas', 'usuarios', 'portadas'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valida',
            errors: { message: 'Tipo de coleccion no es valida' }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe seleccionar una imagen' }
        });
    }

    //Obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extencionArchivo = nombreCortado[nombreCortado.length - 1];

    //Solo estas extenciones aceptamos
    var extencionesvalidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extencionesvalidas.indexOf(extencionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extencion no valida',
            errors: { message: 'Las extenciones validas son ' + extencionesvalidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds()}.${ extencionArchivo }`;

    //Mover el archivo del temporal a un path
    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }


        subirPorTipo(tipo, id, nombreArchivo, res);

        // res.status(200).json({
        //     ok: true,
        //     mensaje: "Archivo movido correctamente",
        //     extencionArchivo: extencionArchivo
        // });


    });

});



function subirPorTipo(tipo, id, nombreArchivo, res) {
    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {

            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }
                });
            }

            var pathViejo = './uploads/usuarios/' + usuario.imagen;

            //Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            usuario.imagen = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {

                // usuarioActualizado.password = ':)';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });

            });
        });
    }

    if (tipo === 'capturas') {
        Ventana.findById(id, (err, ventana) => {

            if (!ventana) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'ventana no existe',
                    errors: { message: 'ventana no existe' }
                });
            }

            var pathViejo = './uploads/ventanas/' + ventana.imagen;

            //Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            ventana.imagen = nombreArchivo;
            ventana.save((err, ventanaActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de ventana actualizada',
                    ventana: ventanaActualizado
                });

            });
        });
    }

    if (tipo === 'portadas') {
        Proyecto.findById(id, (err, proyecto) => {

            if (!proyecto) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'proyecto no existe',
                    errors: { message: 'proyecto no existe' }
                });
            }

            var pathViejo = './uploads/proyectos/' + proyecto.imagen;

            //Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            proyecto.imagen = nombreArchivo;
            proyecto.save((err, proyectoActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de proyecto actualizada',
                    proyecto: proyectoActualizado
                });

            });
        });
    }

}





module.exports = app;