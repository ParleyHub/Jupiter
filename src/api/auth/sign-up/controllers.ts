/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from 'express';

import signUpService from './services';

import type { SignUpDataType, SignUpResponseType } from './types';

const signUpController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    const payload: SignUpDataType = {
      email,
      name,
      password,
      confirmPassword,
    };

    const response: SignUpResponseType = await signUpService(payload);

    res.status(201).json(response);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default signUpController;
