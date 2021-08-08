/* eslint-disable no-useless-return */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const signToken = (name: string): string => {
  const secretKey: string = process.env.SECRET_KEY || '';

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign({ name }, secretKey, options);
};

// eslint-disable-next-line @typescript-eslint/ban-types
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader: string = req.get('Authorization') || '';
  const secretKey: string = process.env.SECRET_KEY || '';

  if (!authHeader) {
    res.status(403).json({ message: 'No token provided.' });

    return;
  }

  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, secretKey, (error) => {
    if (error) {
      res.status(401).json({
        message: 'Failed to authenticate token.',
      });

      return;
    }

    next();
  });
};

export default {
  signToken,
  verifyToken,
};
