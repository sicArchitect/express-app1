const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `src/${name}`));
  };
  next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.show('index.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('style.css', (req, res) => {
  res.show('style.css');
});

// authenticate user
app.get('/user/settings', (req, res) => {
  app.post(
    '/login/password',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureMessage: true,
    }),
    function (req, res) {
      res.redirect('/~' + req.user.username);
    }
  );
});

app.get('/user/panel', (req, res) => {
  app.post(
    '/login/password',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureMessage: true,
    }),
    function (req, res) {
      res.redirect('/~' + req.user.username);
    }
  );
});

app.use((req, res) => {
  res.status(404).send();
});

app.listen(8000, () => {
  console.log('Server running on port: 8000');
});
