import { Request, Response } from 'express';

import changePasswordServices from './services';

import type { IChangePasswordType } from './types';

const changePasswordControllers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const payload: IChangePasswordType = {
      email,
      oldPassword,
      newPassword,
    };
    const changePasswordResult = await changePasswordServices(payload);

    res.status(200).json(changePasswordResult);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default changePasswordControllers;
