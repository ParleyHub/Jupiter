/* eslint-disable @typescript-eslint/no-explicit-any */
import db from '../../../database/models';

import type { IForgotPasswordType } from './types';

const DB: any = db;
const { User } = DB;

const findUser = async (payload: IForgotPasswordType): Promise<any> => {
  const { email } = payload;

  const isEmailExist = await User.findOne({
    where: { email },
  });

  return isEmailExist;
};

export default {
  findUser,
};
