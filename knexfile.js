module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/wizardsUnite',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

};
