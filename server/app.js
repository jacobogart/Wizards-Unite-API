const express = require('express');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('HELLOOOO')
})

app.get('/favicon.ico', (req, res) => {
  res.status(200).send('HELLOOOO')
})

app.get('/api/v1/spells', (req, res) => {
  database('spells').select()
    .then(spells => {
      res.status(200).json(spells);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});


module.exports = app;