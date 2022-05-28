const express = require('express');
const hbs = require('hbs');

// Inicializando el server
const app = express();


// Configurando el motor de plantillas HANDLEBARS
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('views'));


// Creando rutas
const ruta = {
    app: '/api'
}

app.use(ruta.app, require('./routes/control'));

// Corriendo el server
app.listen(3000, () => {
    console.log('App en el puerto 3000')
})