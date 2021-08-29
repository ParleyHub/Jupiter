/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-return */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import redisClient from '../redis';

type GenericObject = { [key: string]: string };

const signToken = (payload: GenericObject): string => {
  const secretKey: string = process.env.SECRET_KEY || '';

  const options = {
    expiresIn: '15m',
  };

  return jwt.sign(payload, secretKey, options);
};

const signRefreshToken = (payload: GenericObject): string => {
  const newPayload = {
    ...payload,
    string: uuidv4(),
  };
  const secretKeyRefreshToken: string =
    process.env.SECRET_KEY_REFRESH_TOKEN || '';

  const options = {
    expiresIn: '2h',
  };

  return jwt.sign(newPayload, secretKeyRefreshToken, options);
};

// eslint-disable-next-line @typescript-eslint/ban-types
const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader: string = req.get('Authorization') || '';

  if (!authHeader) {
    res.status(401).json({ message: 'No token provided.' });

    return;
  }

  const token = authHeader.replace('Bearer ', '');
  const secretKey: string = process.env.SECRET_KEY || '';

  jwt.verify(token, secretKey, (error) => {
    if (error) {
      res.status(401).json({
        message: 'Failed to authenticate.',
      });

      return;
    }

    const decoded: any = jwt.decode(token);

    redisClient.get(`access-token:${decoded.id}`, (err, value) => {
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
  verifyAccessToken,
};
