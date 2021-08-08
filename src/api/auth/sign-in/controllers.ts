import { Request, Response } from 'express';

import signInService from './services';

import type { SignInDataType } from './types';

const signInController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const payload: SignInDataType = {
      email,
      password,
    };
    const signInResult = await signInService(payload);

    res.status(200).json({
      message: signInResult,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default signInController;
