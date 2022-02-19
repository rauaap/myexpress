var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const middleware = require('./utils/middleware')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(middleware.requestLogger)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(middleware.internalServerError);

module.exports = app;
