import { Request, Response } from 'express';

import refreshTokenService from './services';

const refreshTokenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const refreshToken: string = req.body('refresh-token');

    const token = refreshTokenService(refreshToken);

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default refreshTokenController;
