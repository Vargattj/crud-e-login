const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const sessions = require('express-session');
const MySqlStore = require('express-mysql-session');
const { database } = require('./keys');
//initializations
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(sessions({
  secret: 'vargatt45',
  resave: 'false',
  saveUninitialized: false,
  store: new MySqlStore(database),
}))
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Global Variables
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
})