const express = require('express');
const morgan = require('morgan');
const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MysqlSession = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const { database } = require('./config/keys');

//Initializaciones
const app = express();
require('./lib/passport');

//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: '@nt0n10mysqlS3ssion',
    resave: false,
    saveUninitialized: false,
    store: new MysqlSession(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/proyects', require('./routes/proyects'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Inicia Servidor
app.listen(app.get('port'), () => {
    console.log('Server is up on port:', app.get('port'));
});