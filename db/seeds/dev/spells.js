const spells = require('../../../data/spells.json');
const foundables = require('../../../data/foundables.json');

const createSpell = (knex, spell) => {
  return knex('spells').insert({
    name: spell.name,
    description: spell.description,
    image_URL: spell.image
  }, 'id')
  .then(spellID => {
    let foundablePromises = [];
    foundables.foundables
      .filter(foundable => foundable.spell === spell.name)
      .forEach(foundable => {
        foundablePromises.push(
          createFoundable(knex, foundable, spellID)
        )
      });
    
    return Promise.all(foundablePromises)
  });
}

const createFoundable = (knex, foundable, spellID) => {
  return knex('foundables').insert({
    name: foundable.name,
    family: foundable.family,
    page: foundable.page,
    threat_level: foundable.threatLevel,
    description: foundable.description,
    image_URL: foundable.image,
    spell_id: spellID[0]
  })
}

exports.seed = function(knex) {
  return knex('foundables').del()
    .then(() => knex('spells').del())
    .then(() => knex.raw('TRUNCATE TABLE foundables RESTART IDENTITY CASCADE'))
    .then(() => knex.raw('TRUNCATE TABLE spells RESTART IDENTITY CASCADE'))
    .then(() => {
      let spellPromises = [];

      spells.spells.forEach(spell => {
        spellPromises.push(createSpell(knex, spell));
      });

      return Promise.all(spellPromises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
