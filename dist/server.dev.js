"use strict";

var express = require('express');

var path = require('path');

var app = express();
app.use(function (req, res, next) {
  res.show = function (name) {
    res.sendFile(path.join(__dirname, "src/".concat(name)));
  };

  next();
});
app.use(express["static"](path.join(__dirname, '/public')));
app.get('/', function (req, res) {
  res.show('index.html');
});
app.get('/about', function (req, res) {
  res.show('about.html');
});
app.get('/style.css', function (req, res) {
  res.show('style.css');
});
app.get("/user", function (req, res) {
  res.show('forbidden.html');
});
app.get('/error', function (req, res) {
  res.show('404_error.png');
});
app.use(function (req, res) {
  res.status(404).show('404.html');
});
app.listen(8000, function () {
  console.log('Server running on port: 8000');
});