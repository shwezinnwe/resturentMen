var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session=require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var waitersRouter = require('./routes/waiter');
var kitchensRouter = require('./routes/kitchen');
var cashiersRouter = require('./routes/cashier');
var adminsRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
      secret: '@$TuD@ntA&tte!#$%^&09,',// any string for security
      resave: false,
      saveUninitialized : true
}));

// mongoose.connect('mongodb+srv://shwezin:shwe123@restrms-ahkie.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connect('mongodb://127.0.0.1/restdb')
var db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(function(req, res, next){
  if(req.session.users){
    next();
  }else {
    res.redirect('/');// redirect to other page
  }
});
app.use('/users', usersRouter);
app.use('/waiters', waitersRouter);
app.use('/kitchens', kitchensRouter);
app.use('/cashiers', cashiersRouter);
app.use('/admins', adminsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
