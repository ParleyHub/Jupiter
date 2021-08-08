import express, { Application, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import expressRateLimit from 'express-rate-limit';
import compression, { filter } from 'compression';

import rootRouters from '../routers';

const app: Application = express();

const environment = process.env.NODE_ENV || 'development';
const loggingType = environment === 'development' ? 'dev' : 'tiny';
const limiter = expressRateLimit({
  windowMs: 1000,
  max: 10,
});

const shouldCompress = (req: Request, res: Response) => {
  if (req.headers['x-no-compression']) {
    return false;
  }

  return filter(req, res);
};

const compressConfig = {
  level: 9,
  filter: shouldCompress,
};

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan(loggingType));
app.use(cors());
app.use(limiter);
app.use(compression(compressConfig));
app.use('/api', rootRouters);

export default app;
