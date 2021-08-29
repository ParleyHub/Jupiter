console.log('env', process.env.NODE_ENV);
console.log('user', process.env.POSTGRES_USER);
console.log('password', process.env.POSTGRES_PASSWORD);
console.log('host', process.env.POSTGRES_HOST);
console.log('schema', process.env.POSTGRES_SCHEMA);

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
