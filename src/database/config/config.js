console.log('POSTGRES_USER', process.env.POSTGRES_USER);
console.log('POSTGRES_PASSWORD', process.env.POSTGRES_PASSWORD);
console.log('POSTGRES_SCHEMA', process.env.POSTGRES_SCHEMA);
console.log('POSTGRES_HOST', process.env.POSTGRES_HOST);

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_SCHEMA,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  },

  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_SCHEMA,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  },

  test: {},
};
