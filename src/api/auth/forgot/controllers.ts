import { Request, Response } from 'express';

import forgotPasswordServices from './services';

import type { IForgotPasswordType } from './types';

const forgotPasswordControllers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    const payload: IForgotPasswordType = {
      email,
    };
    const changePasswordResult = await forgotPasswordServices(payload);

    res.status(200).json(changePasswordResult);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default forgotPasswordControllers;
