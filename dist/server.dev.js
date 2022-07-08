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
app.get('style.css', function (req, res) {
  res.show('style.css');
}); // authenticate user

app.get('/user/settings', function (req, res) {
  app.post('/login/password', passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true
  }), function (req, res) {
    res.redirect('/~' + req.user.username);
  });
});
app.get('/user/panel', function (req, res) {
  app.post('/login/password', passport.authenticate('local', {
    failureRedirect: '/login',
    failureMessage: true
  }), function (req, res) {
    res.redirect('/~' + req.user.username);
  });
});
app.use(function (req, res) {
  res.status(404).send();
});
app.listen(8000, function () {
  console.log('Server running on port: 8000');
});