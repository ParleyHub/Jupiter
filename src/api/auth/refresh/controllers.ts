/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';

import refreshTokenService from './services';

import type { RequestBodyType } from './types';

const refreshTokenController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { 'refresh-token': refreshToken }: RequestBodyType = req.body;

    const response = await refreshTokenService(refreshToken);

    res.status(200).json(response);
  } catch (error: any) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export default refreshTokenController;
