var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var parser = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var seatRouter = require('./routes/seats');
var bookingRouter = require('./routes/booking');


// Add security to the application
// app.use(helmet());

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(parser.json());
app.use(parser.urlencoded({extended:true}));

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/booking', bookingRouter);
app.use('/seats', seatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.post('/login', function(req, res) {

  var user = req.body;

  
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Start the server and let it listen for incoming requests on port 3000
app.listen(4000, () => {
  console.log(`Server is listening on port: 4000`)
})

module.exports = app;
