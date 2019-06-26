
exports.seed = function(knex) {
  return knex('spells').del()
    .then(() => knex('foundables').del())
    .then(() => {
      return Promise.all([

      ])
    })
};
