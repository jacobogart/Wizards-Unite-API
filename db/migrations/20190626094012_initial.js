
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('spells', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.string('image_URL');

      table.timestamps(true,true);
    }),

    knex.schema.createTable('foundables', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('family');
      table.string('page');
      table.string('threat_level');
      table.string('description');
      table.string('image_URL');
      table.integer('spell_id').unsigned()
      table.foreign('spell_id').references('spells.id');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('spells'),
    knex.schema.dropTable('foundables')
  ]);
};
