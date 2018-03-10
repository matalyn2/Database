/**
* Module dependencies.
*/
var reload = require('reload')
var session = require('express-session');
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , fs = require('fs')
  , path = require('path');
//var methodOverride = require('method-override');
var app = express();
var mysql      = require('mysql');
const validator = require('express-validator');
var bodyParser=require("body-parser");
var busboy = require('connect-busboy');
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'matalynt',
              password : 'job for derek byu',
              database : 'kittens'
            });
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(validator());
app.use(busboy());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({uploadDir:'/public/img/'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/', routes.index);//call for main index page
app.get('/login', routes.index);//call for login page
app.get('/home/logout', routes.index);//call for dashboard page after login

/*app.get('/signup', user.signup);//call for signup page*/
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/kittens', user.kittens);//call for dashboard page after login
app.get('/home/staff', user.staff);//call for dashboard page after login
app.get('/home/owners', user.owners);//call for dashboard page after login
app.get('/home/newkitten', user.newkitten);//call for dashboard page after login
app.get('/home/newowner', user.newowner);//call for dashboard page after login
app.get('/home/newstaff', user.newstaff);//call for dashboard page after login


//Middleware
app.post('/login', user.login);//call for login post
/*app.post('/signup', user.signup);//call for signup post*/
app.post('/home/kittens', user.kittens);//call for dashboard page after login
app.post('/home/staff', user.staff);//call for dashboard page after login
app.post('/home/owners', user.owners);//call for dashboard page after login
app.post('/home/newkitten', user.newkitten);//call for dashboard page after login
app.post('/home/newowner', user.newowner);//call for dashboard page after login
app.post('/home/newstaff', user.newstaff);//call for dashboard page after login


reload(app);
app.listen(8080)
