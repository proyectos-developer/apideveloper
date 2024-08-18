const cors = require('cors')

const express = require ('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require ('connect-flash')
const session = require ('express-session')
const mysqlstore = require('express-mysql-session')
const passport = require('passport')

const { database } = require('./backend/keys.js')

const app = express()
app.use(cors())
require ('./backend/lib/passport.js')

/**Configuraciones */
app.set ('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views')); 
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', 
    helpers: require('./backend/lib/handlebars.js')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(
    session({
        secret: 'faztmysqlnodesession',
        resave: false,
        saveUninitialized: false,
        store: new mysqlstore(database)
    })
)

app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

//Variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.users = req.users
    next()
})
 
//Rutas
app.use(require('./backend/routes/index.js'));
app.use(require('./backend/routes/authentication.js'))

app.use(require('./backend/routes/negocios.js'))
app.use(require('./backend/routes/proyectos.js'))
app.use(require('./backend/routes/correo.js'))
app.use(require('./backend/routes/clientes.js'))
app.use(require('./backend/routes/cotizacion.js'))
app.use(require('./backend/routes/productos.js'))
app.use(require('./backend/routes/favoritos.js'))
app.use(require('./backend/routes/calificaciones.js'))
app.use(require('./backend/routes/categorias.js'))
app.use(require('./backend/routes/subcategorias.js'))
app.use(require('./backend/routes/unidades.js'))
app.use(require('./backend/routes/servicios.js'))
app.use(require('./backend/routes/compras.js'))
app.use(require('./backend/routes/suscripciones.js'))
app.use(require('./backend/routes/noticias.js'))
app.use(require('./backend/routes/empresa.js'))
app.use(require('./backend/routes/trabajadores.js'))
app.use(require('./backend/routes/administradores.js'))

app.use(express.static(path.resolve(__dirname, './backend/views')));
app.get ('/api', (req, res) => {
  res.sendFile(path.resolve(__dirname, './backend/views', 'profile'));
})

//Iniciar el servidor
app.listen (app.get('port'), () => {
    console.log ('Server en puerto ', app.get ('port'))
})
