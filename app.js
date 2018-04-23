//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



////Inicializar variables
var app = express();


// Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    next();
});



//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var escuelaRoutes = require('./routes/escuela');
var experienciaRoutes = require('./routes/experiencia');
var actividadRoutes = require('./routes/actividad');
var loginRoutes = require('./routes/login');
var cursoRoutes = require('./routes/curso');
var habilidadRoutes = require('./routes/habilidad');
var proyectoRoutes = require('./routes/proyecto');
var tecnologiaRoutes = require('./routes/tecnologia');
var ventanaRoutes = require('./routes/ventana');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');





// Conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/portafolioDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');

});



// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/escuela', escuelaRoutes);
app.use('/experiencia', experienciaRoutes);
app.use('/actividad', actividadRoutes);
app.use('/login', loginRoutes);
app.use('/curso', cursoRoutes);
app.use('/habilidad', habilidadRoutes);
app.use('/proyecto', proyectoRoutes);
app.use('/tecnologia', tecnologiaRoutes);
app.use('/ventana', ventanaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);



app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');

});