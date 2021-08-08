import http from 'http';

import express, { Application, Request, Response } from 'express';

import middleware from './middleware';
import database from './database/models';

const app: Application = express();

app.use(middleware);

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to Jupiter!');
});

const server = new http.Server(app);
const PORT = 3000;

database.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`The server listen on port ${PORT}`);
  });
});
