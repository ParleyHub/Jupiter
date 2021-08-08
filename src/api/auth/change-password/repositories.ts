/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../../database/models';

import type { ChangePasswordType } from './types';

const DB: any = db;
const { User } = DB;

const findUser = async (payload: ChangePasswordType): Promise<any> => {
  const { email } = payload;

  const isEmailExist = await User.findOne({
    where: { email },
  });

  return isEmailExist;
};

const changePassword = async (payload: ChangePasswordType): Promise<any> => {
  const { email, password } = payload;

  const user = await User.update({ password }, { where: { email } });

  return user;
};

export default {
  findUser,
  changePassword,
};
