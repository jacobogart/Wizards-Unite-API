const spells = require('./data/spells.json');
const foundables = require('./data/foundables.json');

const targetFoudables = foundables.foundables
  .filter(foundable => foundable.spell === spells.spells[0].name);

console.log(targetFoudables);