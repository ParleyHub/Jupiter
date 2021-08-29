/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';

import signInService from './services';

import type { SignInDataType, SignInResponseType } from './types';

const signInController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const payload: SignInDataType = {
      email,
      password,
    };
    const response: SignInResponseType = await signInService(payload);

    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default signInController;
