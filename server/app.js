const express = require('express');
// Import the express library
const environment = process.env.NODE_ENV || 'development';
// Set the environment variable, defaulting to development
const configuration = require('../knexfile')[environment];
// Configure the database based off the environment
const database = require('knex')(configuration);
// Import the database using the configuration
const app = express();
// Create an instance of the express server

app.use(express.json());
// Use JSON throughout the app

app.get('/', (req, res) => {
// establish the root GET enpoint
  res.status(200).send('HELLOOOO')
  // Send a short message and a 200 status code
})

app.get('/favicon.ico', (req, res) => {
// Establish a route at '/favicon.ico' to get rid of the error
  res.status(200).send('HELLOOOO')
  // Send a short message and a 200 status code
})

app.get('/api/v1/spells', (req, res) => {
// Establish the GET route for all spells
  database('spells').select()
  // Select all extries in the spells database 
    .then(spells => {
      res.status(200).json(spells);
      // Once the data has been received, send it with a 200 status code
    })
    .catch(error => {
      res.status(500).json({ error });
      // Send a 500 status code and the error message if the data fails to come back from the database
    });
});

app.get('/api/v1/foundables', (req, res) => {
// Establish the GET route for all foundables
  database('foundables').select()
  // Select all extries in the foundables database 
    .then(foundables => {
      res.status(200).json(foundables);
      // Once the data has been received, send it with a 200 status code
    })
    .catch(error => {
      res.status(500).json({ error });
      // Send a 500 status code and the error message if the data fails to come back from the database
    });
});

app.get('/api/v1/spells/:id', (req, res) => {
// Establish the GET route for a specific spell
  const { id } = req.params;
  // Destructure the id from the request parameters
  database('spells').where({ id }).select()
  // Select the spell entry with the matching id
    .then(results => {
      if (results.length) {
        res.status(200).json(results[0]);
        // If a spell was found, return it with a 200 status
      } else {
        res.status(404).json({error: `No spells found with the id of ${id}`})
        // If the results came back empty, send back a 404 error with the appropriate id
      }
    })
    .catch(error => {
      res.status(500).json({ error });
      // Send a 500 status code and the error message if the data fails to come back from the database
    });
});

app.get('/api/v1/foundables/:id', (req, res) => {
// Establish the GET route for a specific foundable
  const { id } = req.params;
  // Destructure the id from the request parameters
  database('foundables').where({ id }).select()
  // Select the foundable entry with the matching id
    .then(results => {
      if (results.length) {
        res.status(200).json(results[0]);
        // If a foundable was found, return it with a 200 status
      } else {
        res.status(404).json({ error: `No foundable found with the id of ${id}` })
        // If the results came back empty, send back a 404 error with the appropriate id
      }
    })
    .catch(error => {
      res.status(500).json({ error });
      // Send a 500 status code and the error message if the data fails to come back from the database
    });
});

app.post('/api/v1/spells', (req, res) => {
// Establish the POST route for a new spell
  const newSpell = req.body;
  // Save the body of the request as a variable
  for (let requiredParameter of ['name', 'description', 'image_URL']) {
  // Iterate over the required parameters of the entry
    if (!newSpell[requiredParameter]) {
      return res.status(422)
        .json({ error: `Spell was not added, please make sure you include a ${requiredParameter}` })
      // If a parameter is missing, send a 422 error with the missing parameter
    }
  }

  database('spells').insert(newSpell, 'id')
  // If all required parameters are there, insert the new spell into the DB and return the new id
    .then(id => {
      res.status(201).json({ id: id[0] });
      // Send the new id with a 201 success code
    })
    .catch(error => {
      res.status(500).json({ error });
      // Send a 500 status code and the error message if the data fails to come back from the database
    });
});

app.post('/api/v1/foundables', (req, res) => {
  // Establish the POST route for a new foundable
  const newFoundable = req.body;
  // Save the body of the request as a variable
  const requiredParameters = ['name', 'family', 'page', 'threat_level', 'description', 'image_URL', 'spell']
  // Create an array of the required paramenters 

  for (let requiredParameter of requiredParameters) {
    // Iterate over the required parameters of the entry
    if (!foundable[requiredParameter]) {
      return res.status(422)
        .json({ error: `Foundable was not added, please make sure you include a ${requiredParameter}` })
      // If a parameter is missing, send a 422 error with the missing parameter
    }
  }

  database('spells').where({ name: newFoundable.spell }).select('id')
  // Search the DB for a smell that matches the new foundable and select the ID
    .then(spellId => {
      if (!spellId) {
        res.status(404)
          .json({ error: `No spell found with the name ${newFoundable.spell}. Please choose an existing spell, or create a new spell.` })
        // If no spell is foundm return a 404 error with the missing name
      } else {
        database('foundables').insert({ ...newFoundable, spell_id: spellId }, 'id')
        // If the id is found, create a new foundable from the request body, adding the appropriate id
          .then(newId => {
            res.status(201).json({ newId });
            // Send the new foundable id with a 201 code
          })
          .catch(error => {
            res.status(500).json({ error });
            // Send a 500 status code and the error message if the data fails to come back from the database
          });
      }
    });
});

app.delete('/api/v1/foundables/:id', (req, res) => {
// Establish the DELETE route for a new foundable
  const { id } = req.params;
  // Destructure the id from the request parameters
  database('foundables').where({ id }).del()
  // Serch the DB for an entry with a matching ID and delete it
    .then(result => {
      if (result) {
        res.status(204).send();
        // If an entry was found, send a 204 status 
      } else {
        res.status(404)
          .json({ error: `No foundable found with the id of ${id}` });
        // If no entry was found, send a 404 error with the appropriate id
      }
    })
    .catch(error => {
      res.status(500).json({ error });
      // Send a 500 status code and the error message if the data fails to come back from the database
    });
});

module.exports = app;