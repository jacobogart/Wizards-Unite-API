
exports.up = function(knex) {
  return knex.schema.alterTable('foundables', (table) => {
    table.string('description', 1000).alter()
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('foundables', (table) => {
    table.string('description').alter()
  })
};
