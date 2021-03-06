/* eslint-disable no-console */

import http from 'http';

import express, { Application, Request, Response } from 'express';

import middleware from './middleware';
import database from './database/models';

const app: Application = express();

app.use(middleware);

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to Parley Hub application!');
});

const server = new http.Server(app);
const PORT = 9000;

if (process.env.NODE_ENV !== 'test') {
  database.sequelize
    .sync()
    .then(() => {
      server.listen(PORT, () => {
        console.log(`The server listen on port ${PORT}`);
      });
    })
    .catch((error: unknown) => {
      console.log('Postgres Error', error);
    });
}

if (process.env.NODE_ENV === 'test') {
  server.listen(PORT, () => {
    console.log(`The server listen on port ${PORT}`);
  });
}

export default app;
