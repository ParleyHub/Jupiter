/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../../database/models';

import type { IChangePasswordType } from './types';

const DB: any = db;
const { User } = DB;

const findUser = async (payload: IChangePasswordType): Promise<any> => {
  const { email } = payload;

  const isEmailExist = await User.findOne({
    where: { email },
  });

  return isEmailExist;
};

const changePassword = async (payload: IChangePasswordType): Promise<any> => {
  const { email, newPassword } = payload;

  const user = await User.update(
    { password: newPassword },
    { where: { email } }
  );

  return user;
};

export default {
  findUser,
  changePassword,
};
