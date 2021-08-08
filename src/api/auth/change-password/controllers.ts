import { Request, Response } from 'express';

import changePasswordService from './services';

import type { ChangePasswordType } from './types';

const changePasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password, confirmPassword } = req.body;
    const payload: ChangePasswordType = {
      email,
      password,
      confirmPassword,
    };
    const changePasswordResult = await changePasswordService(payload);

    res.status(200).json({
      message: changePasswordResult,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default changePasswordController;
