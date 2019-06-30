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

app.get('/api/v1/foundables', (req, res) => {
  database('foundables').select()
    .then(foundables => {
      res.status(200).json(foundables);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.get('/api/v1/spells/:id', (req, res) => {
  const { id } = req.params;
  database('spells').where({ id }).select()
    .then(results => {
      if (results.length) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({error: `No spells found with the id of ${id}`})
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.get('/api/v1/foundables/:id', (req, res) => {
  const { id } = req.params;
  database('foundables').where({ id }).select()
    .then(results => {
      if (results.length) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: `No foundable found with the id of ${id}` })
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.post('/api/v1/spells', (req, res) => {
  const newSpell = req.body;
  console,log('body', newSpell);
  for (let requiredParameter of ['name', 'description', 'image_URL']) {
    if (!newSpell[requiredParameter]) {
      return res.status(422)
        .json({ error: `Spell was not added, please make sure you include a ${requiredParameter}` })
    }
  }

  database('spells').insert(newSpell, 'id')
    .then(id => {
      res.status(201).json({ id });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.post('/api/v1/foundables', (req, res) => {
  const newFoundable = req.body;
  const requiredParameters = ['name', 'family', 'page', 'threat_level', 'description', 'image_URL', 'spell']
  
  for (let requiredParameter of requiredParameters) {
    if (!foundable[requiredParameter]) {
      return res.status(422)
        .json({ error: `Foundable was not added, please make sure you include a ${requiredParameter}` })
    }
  }

  database('spells').where({ name: newFoundable.spell }).select('id')
    .then(spellId => {
      if (!spellId) {
        res.status(404)
          .json({ error: `No spell found with the name ${newFoundable.spell}. Please choose an existing spell, or create a new spell.` })
      } else {
        database('foundables').insert({ ...newFoundable, spell_id: spellId }, 'id')
          .then(newId => {
            res.status(201).json({ newId });
          })
          .catch(error => {
            res.status(500).json({ error });
          });
      }
    });
});


module.exports = app;