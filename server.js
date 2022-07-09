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

app.get('/style.css', (req, res) => {
  res.show('style.css');
});

app.get(`/user`, (req, res) => {
  res.show('forbidden.html');
});

app.get('/error', (req, res) => {
  res.show('404_error.png');
});

app.use((req, res) => {
  res.status(404).show('404.html');
});

app.listen(8000, () => {
  console.log('Server running on port: 8000');
});
