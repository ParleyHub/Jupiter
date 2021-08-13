/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-return */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import redisClient from '../redis';

dotenv.config();

type GenericObject = { [key: string]: string };

const signToken = (payload: GenericObject): string => {
  const secretKey: string = process.env.SECRET_KEY || '';

  const options = {
    expiresIn: 1000 * 60 * 15,
  };

  return jwt.sign(payload, secretKey, options);
};

const signRefreshToken = (payload: GenericObject): string => {
  const secretKeyRefreshToken: string =
    process.env.SECRET_KEY_REFRESH_TOKEN || '';

  const options = {
    expiresIn: 1000 * 60 * 60 * 2,
  };

  return jwt.sign(payload, secretKeyRefreshToken, options);
};

// eslint-disable-next-line @typescript-eslint/ban-types
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader: string = req.get('Authorization') || '';
  const secretKey: string = process.env.SECRET_KEY || '';

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided.' });

    return;
  }

  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, secretKey, (error) => {
    if (error) {
      res.status(401).json({
        message: 'Failed to authenticate.',
      });

      return;
    }

    const decoded: any = jwt.decode(token);

    redisClient.get(decoded.id, (err, value) => {
      if (err || !value) {
        res.status(401).json({ message: 'Failed to authenticate.' });

        return;
      }

      if (token === value) {
        next();
      }
    });
  });
};

export default {
  signToken,
  signRefreshToken,
  verifyToken,
};
