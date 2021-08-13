import { Request, Response } from 'express';

import signUpService from './services';

import type { SignUpDataType } from './types';

const signUpController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    const payload: SignUpDataType = {
      email,
      name,
      password,
      confirmPassword,
    };

    const token = await signUpService(payload);

    res.status(201).json({ 'access-token': token });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default signUpController;
