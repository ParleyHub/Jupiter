import { Request, Response } from 'express';

import logoutService from './services';

const logoutController = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader: string = req.get('Authorization') || '';

    logoutService(authHeader);

    res.status(200).json({
      message: 'Signed out',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default logoutController;
